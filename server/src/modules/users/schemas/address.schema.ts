import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({ timestamps: true })
export class Address {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true, default: false })
  isDefault: boolean;

  @Prop({ required: true, enum: ['home', 'office'], default: 'home' })
  tag: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
