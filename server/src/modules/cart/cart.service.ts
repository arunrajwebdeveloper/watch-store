import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async getUserCart(userId: string) {
    return this.cartModel.findOne({ user: userId }).populate('items.product');
  }

  async addToCart(userId: string, dto: AddToCartDto) {
    let cart = await this.cartModel.findOne({ user: userId });

    const productObjectId = new Types.ObjectId(dto.productId); // ✅ FIX

    if (!cart) {
      cart = new this.cartModel({
        user: userId,
        items: [{ product: productObjectId, quantity: dto.quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === dto.productId,
      );

      if (existingItem) {
        existingItem.quantity += dto.quantity;
      } else {
        cart.items.push({ product: productObjectId, quantity: dto.quantity });
      }
    }

    return cart.save();
  }

  async removeFromCart(userId: string, productId: string) {
    const cart = await this.cartModel.findOne({ user: userId });

    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    return cart.save();
  }

  async clearCart(userId: string) {
    const cart = await this.cartModel.findOne({ user: userId });

    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = [];

    return cart.save();
  }
}
