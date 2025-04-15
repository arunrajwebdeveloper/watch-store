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

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    return this.productModel.create(dto);
  }

  async getLatestProducts(limit: number) {
    return this.productModel.find().sort({ createdAt: -1 }).limit(limit).exec();
  }

  async getFilterOptions() {
    try {
      const filterFields = [
        { title: 'Brands', field: 'brand' },
        { title: 'Colors', field: 'color' },
        { title: 'Price', field: 'currentPrice' },
        { title: 'Size', field: 'size' },
        { title: 'Movement Type', field: 'movementType' },
        { title: 'Gender', field: 'gender' },
      ];

      const results = await Promise.all(
        filterFields.map((f) => this.productModel.distinct(f.field)),
      );

      const filters = filterFields.map((f, idx) => ({
        title: f.title,
        items: results[idx],
      }));

      return { filters };
    } catch (error) {
      console.error('Error getting filter options:', error);
      throw new InternalServerErrorException('Failed to load filter options');
    }
  }

  async findAll(filter: FilterProductDto) {
    const query = {};

    if (filter.brand) query['brand'] = filter.brand;
    if (filter.color) query['color'] = filter.color;
    if (filter.size) query['size'] = filter.size;
    if (filter.gender) query['gender'] = filter.gender;
    if (filter.movementType) query['movementType'] = filter.movementType;
    if (filter.minPrice || filter.maxPrice) {
      query['currentPrice'] = {};
      if (filter.minPrice) query['currentPrice']['$gte'] = filter.minPrice;
      if (filter.maxPrice) query['currentPrice']['$lte'] = filter.maxPrice;
    }

    const sort: any = {};
    if (filter.sortBy) {
      sort[filter.sortBy] = filter.sortOrder === 'asc' ? 1 : -1;
    }

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
      lastPage: Math.ceil(total / limit),
    };
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

  async update(id: string, dto: CreateProductDto) {
    const product = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async delete(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }
}
