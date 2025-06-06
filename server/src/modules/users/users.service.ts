import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { SignupDto } from '../auth/admin-auth/dto/signup.dto';
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

  async findAdminUser(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).select('-password').exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findClientUser(id: string): Promise<User | null> {
    const user = await this.userModel
      .findById(id)
      .populate({
        path: 'addressList',
        // options: { lean: true }, // ensure addresses are returned as plain objects
      })
      .select('-password')
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async userLogout() {
    await this.userModel.updateOne(
      { refreshToken: { $exists: true } },
      { $unset: { refreshToken: '' } },
    );
  }

  async findByIdAndUpdate(userId: string, token: string) {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: token });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel
      .findById(id)
      .populate({
        path: 'addressList',
        // options: { lean: true }, // ensure addresses are returned as plain objects
      })
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
