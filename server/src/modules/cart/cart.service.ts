import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductsService } from '../products/products.service';
import { CouponService } from '../coupon/coupon.service';
import { PromocodeType } from '../coupon/schemas/coupon.schema';
import { GST_RATE, SHIPPING_FEE } from '../common/constants/CartRates';
import { PromocodeDto } from './dto/promocode.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,

    private readonly productService: ProductsService,
    private readonly couponService: CouponService,
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
    const session = await this.cartModel.startSession();
    session.startTransaction();

    try {
      const { product } = await this.productService.findById(dto.productId);

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      let cart = await this.cartModel
        .findOne({ user: userId })
        .session(session)
        .exec();
      const productObjectId = new Types.ObjectId(dto.productId);

      if (!cart) {
        cart = new this.cartModel({
          user: userId,
          items: [],
          cartTotal: 0,
          finalTotal: 0,
          discount: 0,
          appliedCoupon: null, // No coupon applied initially
          shipping: 0,
          gstPercentage: 0,
          gstAmount: 0,
        });
      }

      const existingItem = cart.items.find(
        (item) => item.product.toString() === dto.productId,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({
          product: productObjectId,
          quantity: dto.quantity,
          price: product.currentPrice,
        });
      }

      cart.gstPercentage = GST_RATE;
      cart.shippingFee = SHIPPING_FEE;

      // Recalculate totals
      cart.cartTotal = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      // Apply coupon discount if available
      if (cart.appliedCoupon) {
        cart.discount = cart.appliedCoupon.discountAmount;
      } else {
        cart.discount = 0;
      }

      const subtotal = cart.cartTotal + cart.shippingFee - cart.discount;
      const gstAmount = subtotal * cart.gstPercentage;

      cart.gstPercentage = cart.gstPercentage;
      cart.gstAmount = gstAmount;
      cart.finalTotal = subtotal + gstAmount;

      await cart.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return await this.getUserCart(userId);
    } catch (error) {
      // Rollback the transaction if any error occurs
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

      // Recalculate the total price and discount
      cart.cartTotal = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      if (cart.appliedCoupon) {
        cart.discount = cart.appliedCoupon.discountAmount;
      } else {
        cart.discount = 0;
      }

      const subtotal = cart.cartTotal + cart.shippingFee - cart.discount;
      const gstAmount = subtotal * cart.gstPercentage;

      cart.gstPercentage = cart.gstPercentage;
      cart.gstAmount = gstAmount;
      cart.finalTotal = subtotal + gstAmount;

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

  async applyCoupon(userId: string, dto: PromocodeDto) {
    const { couponCode } = dto;

    const session = await this.cartModel.startSession();
    session.startTransaction();

    try {
      const cart = await this.cartModel
        .findOne({ user: userId })
        .session(session)
        .exec();

      if (!cart) throw new NotFoundException('Cart not found');

      // Check if a coupon is already applied (Optional safeguard)
      if (cart.appliedCoupon) {
        throw new BadRequestException(
          'A coupon is already applied to the cart',
        );
      }

      // Fetch coupon from the database
      const coupon = await this.couponService.findCouponByCode(couponCode);

      // Calculate the discount
      let discountAmount = 0;
      if (coupon.type === PromocodeType.FIXED) {
        discountAmount = coupon.discount;
      } else if (coupon.type === PromocodeType.PERCENTAGE) {
        discountAmount = cart.cartTotal * coupon.discount;
      }

      // Apply coupon to the cart
      cart.appliedCoupon = {
        code: coupon.code,
        discountAmount,
        promocodeType: coupon.type,
      };

      // Recalculate discount and final total
      cart.discount = discountAmount;

      const subtotal = cart.cartTotal + cart.shippingFee - discountAmount;
      const gstAmount = subtotal * cart.gstPercentage;

      cart.gstPercentage = cart.gstPercentage;
      cart.gstAmount = gstAmount;
      cart.finalTotal = subtotal + gstAmount;

      await cart.save({ session });

      // Update coupon usage
      await this.couponService.updateCouponUsedCount(
        coupon._id.toString(),
        session,
      );

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

  async removeCoupon(userId: string) {
    const session = await this.cartModel.startSession();
    session.startTransaction();

    try {
      const cart = await this.cartModel
        .findOne({ user: userId })
        .session(session)
        .exec();

      if (!cart) throw new NotFoundException('Cart not found');

      if (!cart.appliedCoupon) {
        throw new BadRequestException('No coupon applied to cart');
      }

      // Remove the applied coupon
      cart.appliedCoupon = null;
      cart.discount = 0;

      // Recalculate totals
      const subtotal = cart.cartTotal + cart.shippingFee;
      const gstAmount = subtotal * cart.gstPercentage;

      cart.gstAmount = gstAmount;
      cart.finalTotal = subtotal + gstAmount;

      await cart.save({ session });

      await session.commitTransaction();
      session.endSession();

      return this.getUserCart(userId); // return updated cart
    } catch (error) {
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

      // If the cart is empty, reset coupon and discount
      if (cart.items.length === 0) {
        cart.appliedCoupon = null;
        cart.discount = 0;
      }

      // Recalculate totals
      cart.cartTotal = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0,
      );

      const subtotal = cart.cartTotal + cart.shippingFee - cart.discount;
      const gstAmount = subtotal * cart.gstPercentage;

      cart.gstPercentage = cart.gstPercentage;
      cart.gstAmount = gstAmount;
      cart.finalTotal = subtotal + gstAmount;

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
      cart.appliedCoupon = null;
      cart.discount = 0;
      cart.finalTotal = 0;
      cart.gstPercentage = 0;
      cart.gstAmount = 0;

      await cart.save({ session }); // Save changes within the transaction session

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
