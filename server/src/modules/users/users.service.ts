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
    return this.userModel.find().select('-password').lean().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').lean().exec();
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
}
