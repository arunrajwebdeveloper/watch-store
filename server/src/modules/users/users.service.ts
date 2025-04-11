import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { SignupDto } from '../auth/dto/signup.dto';
import { AddressDto } from './dto/address.dto';
import { WishlistDto } from './dto/wishlist.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async createUser(dto: SignupDto): Promise<User> {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) throw new ConflictException('Email already exists');
    return this.userModel.create(dto);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().lean().exec();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel
      .findById(id)
      // .select('-password') // used {select: false} in schema
      .populate('wishList.product')
      .lean()
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async addAddress(id: string, dto: AddressDto) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { address: dto },
      { new: true },
    );

    if (!user) throw new NotFoundException('User not found');

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      address: user.address,
    };
  }

  async addToWishlist(userId: string, dto: WishlistDto) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.wishList) {
      user.wishList = [];
    }

    const alreadyExists = user.wishList.some(
      (item) => item.product.toString() === dto.productId,
    );

    if (alreadyExists) {
      throw new BadRequestException('Product is already in the wishlist');
    }

    user.wishList.push({
      product: new Types.ObjectId(dto.productId),
      addedAt: new Date(),
    });

    await user.save();

    return { message: 'Product added to wishlist' };
  }
}
