import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
    private readonly productService: ProductsService,
  ) {}

  async getUserCart(userId: string) {
    const cart = await this.cartModel
      .findOne({ user: userId })
      .populate('items.product')
      .lean()
      .exec();

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }

  async addToCart(userId: string, dto: AddToCartDto) {
    const session = await this.cartModel.startSession();
    session.startTransaction();

    try {
      const { product } = await this.productService.findById(dto.productId);

      if (!product) throw new NotFoundException('Product not found');

      let cart = await this.cartModel
        .findOne({ user: userId })
        .session(session);

      if (!cart) {
        cart = new this.cartModel({ user: userId, items: [], cartTotal: 0 });
      }

      const productObjectId = new Types.ObjectId(dto.productId);

      const existingItem = cart.items.find(
        (item) => item.product.toString() === dto.productId,
      );

      if (existingItem) {
        existingItem.quantity += dto.quantity;
      } else {
        cart.items.push({
          product: productObjectId,
          quantity: dto.quantity,
          price: product.currentPrice,
        });
      }

      cart.cartTotal = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      await cart.save({ session });

      await session.commitTransaction();
      session.endSession();

      return this.getUserCart(userId);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async updateQuantity(userId: string, productId: string, dto: UpdateCartDto) {
    const session = await this.cartModel.startSession();
    session.startTransaction();

    try {
      // Fetch the cart for the user
      const cart = await this.cartModel
        .findOne({ user: userId })
        .session(session)
        .exec();
      if (!cart) throw new NotFoundException('Cart not found');

      // Find the cart item by product ID
      const item = cart.items.find((i) => i.product.toString() === productId);
      if (!item) throw new NotFoundException('Product not in cart');

      // Update the quantity of the product
      item.quantity = dto.quantity;

      // Recalculate the total price
      cart.cartTotal = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      await cart.save({ session });

      // Commit the transaction if everything is fine
      await session.commitTransaction();
      session.endSession();

      // Return the updated cart
      return this.getUserCart(userId);
    } catch (error) {
      // Rollback the transaction if something went wrong
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  // Remove from cart with session transaction
  async removeFromCart(userId: string, productId: string) {
    const session = await this.cartModel.startSession();
    session.startTransaction();

    try {
      const cart = await this.cartModel.findOne({ user: userId }).exec();
      if (!cart) throw new NotFoundException('Cart not found');

      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId,
      );

      // Recalculate totals
      cart.cartTotal = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      await cart.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return this.getUserCart(userId);
    } catch (error) {
      // Rollback the transaction if any error occurs
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  // Clear cart with session transaction
  async clearCart(userId: string) {
    const session = await this.cartModel.startSession();
    session.startTransaction();

    try {
      const cart = await this.cartModel.findOne({ user: userId }).exec();
      if (!cart) throw new NotFoundException('Cart not found');

      cart.items = [];
      cart.cartTotal = 0;

      await cart.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return this.getUserCart(userId);
    } catch (error) {
      // Rollback the transaction if any error occurs
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
