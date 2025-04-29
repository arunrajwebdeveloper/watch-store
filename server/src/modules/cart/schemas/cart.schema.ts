import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { PromocodeType } from 'src/modules/coupon/schemas/coupon.schema';

export interface AppliedCoupon {
  code: string;
  discount: number;
  promocodeType: string;
}

export type CartDocument = Cart & Document;

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

  // @Prop({
  //   type: [
  //     {
  //       code: { type: String },
  //       discountAmount: { type: Number, default: 0 },
  //     },
  //   ],
  //   default: null,
  // })
  // appliedCoupon: AppliedCoupon | null;

  @Prop({
    type: {
      code: { type: String },
      discount: { type: Number, default: 0 },
      promocodeType: { type: String, enum: PromocodeType },
    },
    default: null,
  })
  appliedCoupon: AppliedCoupon | null;

  @Prop({ default: 0 })
  gstPercentage: number;

  @Prop({ default: 0, required: true })
  gstAmount: number;

  @Prop({ default: 0 })
  shippingFee: number;

  @Prop({ default: 0, required: true })
  finalTotal: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
