import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

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

  @Prop({ default: 0 })
  finalTotal: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
