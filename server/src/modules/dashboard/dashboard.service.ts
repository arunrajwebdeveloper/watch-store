import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../products/schemas/products.schema';
import { User, UserDocument } from '../users/schemas/users.schema';
import { Order, OrderDocument } from '../order/schemas/order.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,

    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async getStatistics() {
    const [productCount, userCount, orderCount] = await Promise.all([
      this.productModel.countDocuments({}),
      this.userModel.countDocuments({}),
      this.orderModel.countDocuments({}),
    ]);

    return {
      productCount,
      userCount,
      orderCount,
    };
  }
}
