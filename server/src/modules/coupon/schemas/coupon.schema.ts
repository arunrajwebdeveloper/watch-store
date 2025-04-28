import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';

export type CouponDocument = Coupon & Document;

export enum PromocodeType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
}

@Schema({ timestamps: true })
export class Coupon {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  discount: number; // {FIXED: 200 = INR200, PERCENTAGE: 0.1 = 10%}

  @Prop({ required: true })
  expiry: Date;

  @Prop({ required: true })
  @IsEnum([PromocodeType.FIXED, PromocodeType.PERCENTAGE])
  type: string;

  @Prop({ required: true })
  usageLimit: number;

  @Prop()
  usedCount: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
