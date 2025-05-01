import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Connection, Types } from 'mongoose';
import { Cart } from '../cart/schemas/cart.schema';
import { Order } from './schemas/order.schema';
import { InjectConnection } from '@nestjs/mongoose';
import { PlaceOrderDto } from './dto/place-order.dto';
import * as crypto from 'crypto';
import { Product, ProductDocument } from '../products/schemas/products.schema';
import { PaymentService } from '../payment/payment.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
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
      const cart = await this.cartModel.findOne({ userId }).session(session);
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
            `Insufficient stock for ${product?.model || 'a product'}`,
          );
        }

        product.inventory -= item.quantity;
        await product.save({ session });
      }

      // Create order
      const order = new this.orderModel({
        userId,
        items: cart.items,
        address: cart.address,
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
      cart.appliedCoupon = null;
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
}
