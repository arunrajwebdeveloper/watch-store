import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { PromocodeType } from '../../coupon/schemas/coupon.schema';

export type CartDocument = Cart & Document;

export interface AppliedCoupon {
  code: string;
  discount: number;
  discountType: PromocodeType;
}

@Schema({ timestamps: true })
export class Cart {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  })
  user: Types.ObjectId;

  @Prop({
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true, default: 1 },
        price: { type: Number, required: true, default: 0 },
      },
    ],
    default: [],
  })
  items: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({ default: 0 })
  cartTotal: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ default: 0 })
  finalTotal: number;

  @Prop({ default: 0 })
  gstPercentage: number;

  @Prop({ default: 0 })
  gstAmount: number;

  @Prop({ default: 0 })
  shippingFee: number;

  @Prop({
    type: {
      code: { type: String },
      discount: { type: Number, default: 0 },
      discountType: { type: String, enum: Object.values(PromocodeType) },
    },
    default: null,
  })
  appliedCoupon: AppliedCoupon | null;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    default: null,
  })
  address: Types.ObjectId | null;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
