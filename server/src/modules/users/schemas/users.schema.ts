import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Address, AddressSchema } from './address.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  // {select: false} used for to avoid this key in response
  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'customer'], default: 'customer' })
  role: string;

  @Prop({ type: AddressSchema })
  address?: Address;

  @Prop({ default: null })
  avatar?: string;

  @Prop({
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  wishList?: {
    product: Types.ObjectId;
    addedAt?: Date;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);
