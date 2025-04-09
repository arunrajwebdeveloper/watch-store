import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Types.ObjectId[];

  @Prop({ required: true })
  amount: number;

  @Prop({ default: 'pending' }) // 'pending', 'paid', 'failed'
  status: string;

  @Prop()
  razorpayOrderId: string;

  @Prop()
  razorpayPaymentId: string;

  @Prop()
  razorpaySignature: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
