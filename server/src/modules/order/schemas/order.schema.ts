import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { AppliedCoupon } from '../../cart/schemas/cart.schema';
import { PromocodeType } from '../../coupon/schemas/coupon.schema';

export type OrderDocument = Order & Document;

class PaymentInfo {
  @Prop()
  razorpayOrderId: string;

  @Prop()
  razorpayPaymentId: string;

  @Prop()
  method: string;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  // @Prop([{ product: Types.ObjectId, quantity: Number }])
  // items: Array<{ product: Types.ObjectId; quantity: number }>;

  @Prop([
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    },
  ])
  items: Array<{
    product: Types.ObjectId;
    quantity: number;
  }>;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    default: null,
  })
  address: Types.ObjectId;

  @Prop()
  totalAmount: number;

  @Prop({ type: PaymentInfo })
  payment: PaymentInfo;

  @Prop({
    type: {
      code: { type: String },
      discount: { type: Number, default: 0 },
      discountType: { type: String, enum: Object.values(PromocodeType) },
    },
    default: null,
  })
  coupon?: AppliedCoupon | null;

  @Prop({ default: 'pending' })
  status: string;

  @Prop([{ status: String, updatedAt: Date }])
  statusHistory: Array<{ status: string; updatedAt: Date }>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
