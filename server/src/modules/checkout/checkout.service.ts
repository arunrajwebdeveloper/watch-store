import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from '../cart/cart.service';
import { CouponService } from '../coupon/coupon.service';
import { UsersService } from '../users/users.service';
import { CheckoutDto } from './dto/checkout.dto';
import { Checkout } from './schemas/checkout.schema';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel('Checkout') private readonly checkoutModel: Model<Checkout>,
    private readonly cartService: CartService,
    private readonly couponService: CouponService,
    private readonly userService: UsersService,
  ) {}

  async applyCouponCode(userId: string, couponCode?: string): Promise<any> {
    const cart = await this.cartService.getUserCart(userId);
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    let total = 0;
    cart.items.forEach((item) => {
      total += item.price * item.quantity;
    });

    let discount = 0;
    if (couponCode) {
      const coupon = await this.couponService.validateCoupon(couponCode);
      discount = coupon ? coupon.discount : 0;
    }

    const finalTotal = total - discount;
    return { total, discount, finalTotal };
  }

  async createCheckout(
    userId: string,
    checkoutDto: CheckoutDto,
  ): Promise<Checkout> {
    const checkoutData = new this.checkoutModel({
      user: userId,
      ...checkoutDto,
    });
    return checkoutData.save();
  }
}
