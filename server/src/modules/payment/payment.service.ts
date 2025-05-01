import { Injectable, NotFoundException } from '@nestjs/common';
import { razorpay } from 'src/utils/razorpay.util';
import * as crypto from 'crypto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { CartService } from '../cart/cart.service';

@Injectable()
export class PaymentService {
  constructor(private readonly cartService: CartService) {}

  async createPayment(userId: string) {
    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;

    if (!RAZORPAY_KEY_ID) {
      throw new NotFoundException('RAZORPAY_KEY_ID missing');
    }

    const cart = await this.cartService.getUserCart(userId);

    const amountInPaise = cart.finalTotal * 100;

    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    return {
      razorpayOrderId: razorpayOrder.id,
      amount: amountInPaise,
      currency: 'INR',
      key: RAZORPAY_KEY_ID,
    };
  }

  verifyPayment(dto: VerifyPaymentDto) {
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

    if (!RAZORPAY_KEY_SECRET) {
      throw new NotFoundException('RAZORPAY_KEY_SECRET missing');
    }
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = dto;

    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      throw new Error('Payment verification failed');
    }

    return { verified: true };
  }
}
