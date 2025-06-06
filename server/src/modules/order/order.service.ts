import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Cart, CartDocument } from '../cart/schemas/cart.schema';
import { Order, OrderDocument } from './schemas/order.schema';
import { InjectConnection } from '@nestjs/mongoose';
import { PlaceOrderDto } from './dto/place-order.dto';
import { Product, ProductDocument } from '../products/schemas/products.schema';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectConnection() private connection: Connection,

    private readonly paymentService: PaymentService,
  ) {}

  async placeOrder(userId: string, dto: PlaceOrderDto) {
    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      // Verify payment
      this.paymentService.verifyPayment(dto);

      // Fetch cart
      const cart = await this.cartModel
        .findOne({ user: userId })
        .session(session)
        .exec();

      if (!cart || cart.items.length === 0) {
        throw new NotFoundException('Cart is empty');
      }

      // Check and update stock
      for (const item of cart.items) {
        const product = await this.productModel
          .findById(item.product._id)
          .session(session);

        if (!product || product.inventory < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for ${`${product?.brand} ${product?.model}` || 'a product'}`,
          );
        }

        product.inventory -= item.quantity;

        await product.save({ session });
      }

      // Create order
      const order = new this.orderModel({
        userId,
        items: cart.items,
        address: cart?.address?._id,
        totalAmount: cart.finalTotal,
        payment: {
          razorpayOrderId: dto.razorpayOrderId,
          razorpayPaymentId: dto.razorpayPaymentId,
          method: 'razorpay',
        },
        coupon: cart.appliedCoupon || null,
        status: 'placed',
      });

      await order.save({ session });

      // Clear cart
      cart.items = [];
      cart.cartTotal = 0;
      cart.appliedCoupon = null;
      cart.discount = 0;
      cart.finalTotal = 0;
      cart.gstPercentage = 0;
      cart.gstAmount = 0;
      cart.shippingFee = 0;
      cart.address = null;

      await cart.save({ session });

      await session.commitTransaction();
      session.endSession();

      return { message: 'Order placed successfully', orderId: order._id };
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }

  async getOrdersByUser(userId: string) {
    return this.orderModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .populate('items.product', 'brand model price images')
      .select('-__v')
      .exec();
  }

  async getOrderById(userId: string, orderId: string) {
    return this.orderModel
      .findOne({
        _id: orderId,
        userId,
      })
      .populate('items.product', 'brand model price images')
      .select('-__v')
      .exec();
  }

  async getOrderDetails(orderId: string) {
    return this.orderModel
      .findOne({
        _id: orderId,
      })
      .populate('items.product', 'brand model price images')
      .populate('address')
      .populate('userId', 'avatar email firstName lastName')
      .select('-__v')
      .lean()
      .exec();
  }

  async getAllOrders(status: string) {
    const filter = status === 'all' ? {} : { status };
    return this.orderModel
      .find(filter)
      .populate('userId', 'name email')
      .populate('items.product', 'brand model price')
      .sort({ createdAt: -1 })
      .select('-__v')
      .exec();
  }

  async updateOrderStatus(orderId: string, status: string) {
    const allowedStatuses = [
      'placed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
    ];
    if (!allowedStatuses.includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    order.status = status;
    order.statusHistory.push({ status, updatedAt: new Date() });
    await order.save();

    return {
      message: 'Order status updated',
      orderId: order._id,
      status: order.status,
    };
  }
}
