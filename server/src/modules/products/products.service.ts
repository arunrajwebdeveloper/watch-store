import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/products.schema';
import { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { extractArrayFilter, regexArray } from '../../utils/query-parser.util';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = await this.productModel.create(dto);

    this.eventEmitter.emit('product.created', {
      brand: dto.brand,
      model: dto.model,
    });

    return product;
  }

  async getLatestProducts(limit: number) {
    return this.productModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }

  async getFilterOptions() {
    try {
      const filterFields = [
        { key: 'brands', title: 'Brands', field: 'brand' },
        { key: 'colors', title: 'Colors', field: 'color' },
        { key: 'size', title: 'Size', field: 'size' },
        { key: 'movementType', title: 'Movement Type', field: 'movementType' },
        { key: 'gender', title: 'Gender', field: 'gender' },
      ];

      const results = await Promise.all([
        this.productModel
          .findOne()
          .sort({ currentPrice: 1 })
          .select('currentPrice')
          .lean(),
        this.productModel
          .findOne()
          .sort({ currentPrice: -1 })
          .select('currentPrice')
          .lean(),
        ...filterFields.map((f) => this.productModel.distinct(f.field)),
      ]);

      const minPriceDoc = results[0] as { currentPrice?: number } | null;
      const maxPriceDoc = results[1] as { currentPrice?: number } | null;
      const distinctResults = results.slice(2) as unknown[][];

      const filters: Record<string, any> = {
        price: {
          title: 'Price',
          items: [
            minPriceDoc?.currentPrice ?? 0,
            maxPriceDoc?.currentPrice ?? 0,
          ],
          field: 'price',
        },
      };

      filterFields.forEach((f, idx) => {
        filters[f.key] = {
          title: f.title,
          items: distinctResults[idx],
          field: f.field,
        };
      });

      return filters;
    } catch (error) {
      console.error('Error getting filter options:', error);
      throw new InternalServerErrorException('Failed to load filter options');
    }
  }

  async findAll(filter: FilterProductDto) {
    const query: any = {};
    const multiFields = ['brand', 'color', 'movementType', 'size'];

    for (const field of multiFields) {
      const raw = filter[field] || filter[`${field}[]`];
      const values = extractArrayFilter(raw);

      if (values.length) {
        query[field] = { $in: regexArray(values) };
      }
    }

    if (filter.gender)
      query['gender'] = { $regex: new RegExp(`^${filter.gender}$`, 'i') };
    if (filter.minPrice || filter.maxPrice) {
      query['currentPrice'] = {};
      if (filter.minPrice) query['currentPrice']['$gte'] = filter.minPrice;
      if (filter.maxPrice) query['currentPrice']['$lte'] = filter.maxPrice;
    }

    const sort: Record<string, 1 | -1> =
      filter.sortBy && filter.sortOrder
        ? { [filter.sortBy]: filter.sortOrder === 'asc' ? 1 : -1 }
        : { createdAt: -1 };

    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.productModel.find(query).sort(sort).skip(skip).limit(limit).exec(),
      this.productModel.countDocuments(query),
    ]);

    return {
      data,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    };
  }

  escapeRegex(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  async searchProducts(query: string) {
    try {
      if (!query) return [];

      // const searchRegex = new RegExp(`${this.escapeRegex(query)}`, 'i');

      // return await this.productModel
      //   .find({
      //     $or: [
      //       { brand: { $regex: searchRegex } },
      //       { model: { $regex: searchRegex } },
      //     ],
      //   })
      //   .limit(10)
      //   .select('brand model _id')
      //   .lean();

      const startsWith = await this.productModel
        .find({
          $or: [
            { brand: { $regex: `^${this.escapeRegex(query)}`, $options: 'i' } },
            { model: { $regex: `^${this.escapeRegex(query)}`, $options: 'i' } },
          ],
        })
        .limit(5)
        .select('brand model _id')
        .lean();

      const contains = await this.productModel
        .find({
          $or: [
            { brand: { $regex: this.escapeRegex(query), $options: 'i' } },
            { model: { $regex: this.escapeRegex(query), $options: 'i' } },
          ],
          _id: { $nin: startsWith.map((p) => p._id) }, // avoid duplicates
        })
        .limit(5)
        .select('brand model _id')
        .lean();

      return [...startsWith, ...contains];
    } catch (error) {
      console.error('Search error:', error);
      throw new InternalServerErrorException('Search failed');
    }
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    let variants: (typeof product)[] = [];

    if (product.variantGroupId) {
      const allVariants = await this.productModel.find({
        variantGroupId: product.variantGroupId,
      });

      variants = allVariants.sort((a, b) => {
        const aId = a._id as Types.ObjectId;
        const bId = b._id as Types.ObjectId;
        const currentId = product._id as Types.ObjectId;

        if (aId.equals(currentId)) return -1;
        if (bId.equals(currentId)) return 1;
        return 0;
      });
    }

    return { product, variants };
  }

  // async update(id: string, dto: CreateProductDto) {
  //   const product = await this.productModel.findByIdAndUpdate(id, dto, {
  //     new: true,
  //   });
  //   if (!product) throw new NotFoundException('Product not found');
  //   return product;
  // }

  async patch(id: string, dto: UpdateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true, // Optional: ensures updated fields are validated
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
