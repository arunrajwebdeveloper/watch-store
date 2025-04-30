import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { SignupDto } from '../auth/dto/signup.dto';
import { AddressDto } from './dto/address.dto';
import { Address, AddressDocument } from './schemas/address.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @InjectModel(Address.name)
    private readonly addressModel: Model<AddressDocument>,
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
      .populate('addressList')
      .select('-password')
      .lean()
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async addAddress(userId: string, dto: AddressDto) {
    const address = await this.addressModel.create({ ...dto, userId });

    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $push: { addressList: address._id } },
        { new: true },
      )
      .populate('addressList')
      .lean()
      .exec();

    if (!user) throw new NotFoundException('User not found');
    const { password, ...rest } = user;
    return { user: rest };
  }

  async getUserAddresses(userId: string) {
    const user = await this.userModel
      .findById(userId)
      .populate('addressList')
      .lean()
      .exec();

    if (!user) throw new NotFoundException('User not found');

    return user.addressList;
  }
}
