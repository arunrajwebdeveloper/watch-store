import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop([{ productId: Types.ObjectId, quantity: Number }])
  items: Array<{ productId: Types.ObjectId; quantity: number }>;

  @Prop()
  address: any;

  @Prop()
  totalAmount: number;

  @Prop()
  payment: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    method: string;
  };

  @Prop()
  coupon?: {
    code: string;
    discountAmount: number;
  };

  @Prop({ default: 'pending' })
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
