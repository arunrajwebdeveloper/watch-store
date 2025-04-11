import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/orders.schema';
import { Model, Types } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  private razorpay: Razorpay;

  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID as string,
      key_secret: process.env.RAZORPAY_SECRET as string,
    });
  }

  /**
   * Create Razorpay order and DB record
   */
  async createOrder(userId: string, dto: CreateOrderDto) {
    const amountInPaise = dto.amount * 100;

    const razorpayOrder = await this.razorpay.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    const newOrder = new this.orderModel({
      user: new Types.ObjectId(userId),
      products: dto.products.map((id) => new Types.ObjectId(id)),
      amount: dto.amount,
      address: dto.address,
      status: 'pending',
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();

    return {
      razorpayOrderId: razorpayOrder.id,
      amount: dto.amount,
      currency: 'INR',
      orderId: newOrder._id,
    };
  }

  /**
   * Handle Razorpay webhook verification and update payment status
   */
  async handleWebhook(body: any, razorpaySignature: string) {
    const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!RAZORPAY_WEBHOOK_SECRET)
      throw new Error('Razorpay webhook secret is not set');

    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(body))
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      throw new Error('Invalid Razorpay signature');
    }

    const payment = body.payload.payment.entity;

    await this.orderModel.findOneAndUpdate(
      { razorpayOrderId: payment.razorpay_order_id },
      {
        status: 'paid',
        razorpayPaymentId: payment.razorpay_payment_id,
        razorpaySignature,
      },
    );
  }

  /**
   * Get all orders for a user
   */
  async getOrders(userId: string) {
    return this.orderModel
      .find({ user: userId })
      .populate('products')
      .sort({ createdAt: -1 });
  }

  /**
   * Get a specific order by ID for a user
   */
  async getOrderById(userId: string, orderId: string) {
    const order = await this.orderModel
      .findOne({ _id: orderId, user: userId })
      .populate('products');

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  /**
   * Admin or system updates order status
   */
  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const order = await this.orderModel.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    order.status = status;
    await order.save();

    return {
      message: `Order status updated to ${status}`,
      order,
    };
  }
}
