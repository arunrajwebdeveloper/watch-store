import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type CheckoutDocument = Checkout & Document;

@Schema({ timestamps: true })
export class Checkout {
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

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop()
  couponCode?: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 0 })
  discount: number;

  @Prop({ required: true })
  finalAmount: number;

  @Prop({ enum: ['pending', 'completed'], default: 'pending' })
  status: 'pending' | 'completed';
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
