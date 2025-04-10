import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';
import { SignupDto } from '../auth/dto/signup.dto';
import { UserDetailsDto } from './dto/user-details.dto';

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
    return this.userModel.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).populate('details').exec();
  }

  async addUserDetails(id: string, dto: UserDetailsDto) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { details: dto },
      { new: true },
    );

    if (!user) throw new NotFoundException('User not found');

    return {
      id: user._id.toString(),
      email: user.email,
      details: user.details,
    };
  }
}
