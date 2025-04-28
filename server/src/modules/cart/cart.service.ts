import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Types, Connection } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product, ProductDocument } from '../products/schemas/products.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,

    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,

    @InjectConnection() private readonly connection: Connection,
  ) {}

  async getUserCart(userId: string) {
    const cart = this.cartModel
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
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const product = await this.productModel
        .findById(dto.productId)
        .session(session);
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      let cart = await this.cartModel
        .findOne({ user: userId })
        .session(session);

      const productObjectId = new Types.ObjectId(dto.productId);

      if (!cart) {
        cart = new this.cartModel({
          user: userId,
          items: [
            {
              product: productObjectId,
              quantity: dto.quantity,
              price: product.currentPrice,
            },
          ],
          cartTotal: dto.quantity * product.currentPrice,
          finalTotal: dto.quantity * product.currentPrice,
          discount: 0,
        });
      } else {
        const existingItem = cart.items.find(
          (item) => item.product.toString() === dto.productId,
        );

        if (existingItem) {
          existingItem.quantity += dto.quantity; // use dto.quantity instead of hardcoded 1
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

        cart.finalTotal = cart.cartTotal - (cart.discount || 0);
      }

      await cart.save({ session });
      await session.commitTransaction();
      session.endSession();

      return await this.getUserCart(userId);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async updateQuantity(userId: string, productId: string, dto: UpdateCartDto) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const cart = await this.cartModel
        .findOne({ user: userId })
        .session(session);
      if (!cart) throw new NotFoundException('Cart not found');

      const item = cart.items.find((i) => i.product.toString() === productId);
      if (!item) throw new NotFoundException('Product not in cart');

      if (dto.quantity <= 0) {
        // If quantity is 0 or less, remove item from cart
        cart.items = cart.items.filter(
          (i) => i.product.toString() !== productId,
        );
      } else {
        item.quantity = dto.quantity;
      }

      cart.cartTotal = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      cart.finalTotal = cart.cartTotal - (cart.discount || 0);

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

  async removeFromCart(userId: string, productId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const cart = await this.cartModel
        .findOne({ user: userId })
        .session(session);
      if (!cart) throw new NotFoundException('Cart not found');

      const initialItemCount = cart.items.length;
      cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId,
      );

      if (cart.items.length === initialItemCount) {
        throw new NotFoundException('Product not found in cart');
      }

      if (cart.items.length === 0) {
        //  If cart is now empty after removing item, delete the cart
        await cart.deleteOne({ session });
      } else {
        //  If cart still has items, recalculate totals
        cart.cartTotal = cart.items.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0,
        );
        cart.finalTotal = cart.cartTotal - (cart.discount || 0);
        await cart.save({ session });
      }

      await session.commitTransaction();
      session.endSession();

      return this.getUserCart(userId);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async clearCart(userId: string) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const cart = await this.cartModel
        .findOne({ user: userId })
        .session(session);
      if (!cart) throw new NotFoundException('Cart not found');

      cart.items = [];
      cart.cartTotal = 0;
      cart.finalTotal = 0;

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
}
