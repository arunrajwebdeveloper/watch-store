import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
  ) {}

  async getUserCart(userId: string) {
    return this.cartModel
      .findOne({ user: userId })
      .populate('items.product')
      .lean()
      .exec();
  }

  async addToCart(userId: string, dto: AddToCartDto) {
    let cart = await this.cartModel.findOne({ user: userId }).exec();

    const productObjectId = new Types.ObjectId(dto.productId);

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
        existingItem.quantity += 1;
      } else {
        cart.items.push({ product: productObjectId, quantity: dto.quantity });
      }
    }

    return cart.save();
  }

  async updateQuantity(userId: string, productId: string, dto: UpdateCartDto) {
    const cart = await this.cartModel.findOne({ user: userId }).exec();
    if (!cart) throw new NotFoundException('Cart not found');

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) throw new NotFoundException('Product not in cart');

    item.quantity = dto.quantity;
    await cart.save();
    return this.getUserCart(userId);
  }

  async removeFromCart(userId: string, productId: string) {
    const cart = await this.cartModel.findOne({ user: userId }).exec();

    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    return cart.save();
  }

  async clearCart(userId: string) {
    const cart = await this.cartModel.findOne({ user: userId }).exec();

    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = [];
    return cart.save();
  }
}
