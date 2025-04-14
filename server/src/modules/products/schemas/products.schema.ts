import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  originalPrice: number;

  @Prop({ required: true })
  currentPrice: number;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true, enum: ['analog', 'automatic', 'digital', 'smart'] })
  movementType: string;

  @Prop({ required: true, enum: ['male', 'female'] })
  gender: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
