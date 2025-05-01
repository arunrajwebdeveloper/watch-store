import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../products/schemas/products.schema';
import { Cart, CartSchema } from '../cart/schemas/cart.schema';
import { Order, OrderSchema } from './schemas/order.schema';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Cart.name, schema: CartSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
    PaymentModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
