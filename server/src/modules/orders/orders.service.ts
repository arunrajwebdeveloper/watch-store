import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './orders.schema';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class OrdersService {
  private razorpay: Razorpay;

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  }

  /**
   * Razorpay Order Creation + DB Order entry
   */
  async createOrder(userId: string, dto: CreateOrderDto) {
    const razorpayOrder = await this.razorpay.orders.create({
      amount: dto.amount * 100, // INR in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    const newOrder = new this.orderModel({
      user: new Types.ObjectId(userId),
      products: dto.products.map((id) => new Types.ObjectId(id)),
      amount: dto.amount,
      status: 'pending',
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();

    return { razorpayOrder, orderId: newOrder._id };
  }

  /**
   * Handle Razorpay webhook for payment capture
   */
  async handleWebhook(body: any, razorpaySignature: string) {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret) {
      throw new Error('Razorpay secret key missing!');
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      throw new Error('Invalid Razorpay signature');
    }

    const { razorpay_order_id, razorpay_payment_id } =
      body.payload.payment.entity;

    await this.orderModel.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        status: 'paid',
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature,
      },
    );
  }

  /**
   * Your old logic - Optional Checkout Logic
   */
  async checkout(userId: string) {
    // Placeholder logic, adapt to your cart system if needed
    return {
      message: 'Proceeding to checkout',
      user: userId,
    };
  }

  /**
   * Get all orders for logged-in user
   */
  async getOrders(userId: string) {
    return this.orderModel
      .find({ user: userId })
      .populate('products')
      .sort({ createdAt: -1 });
  }

  /**
   * Get single order (with user scope)
   */
  async getOrderById(userId: string, orderId: string) {
    const order = await this.orderModel
      .findOne({ _id: orderId, user: userId })
      .populate('products');

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
