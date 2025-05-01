import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';
import { Product, ProductSchema } from '../products/schemas/products.schema';
import { ProductsModule } from '../products/products.module';
import { CouponModule } from '../coupon/coupon.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    ProductsModule,
    CouponModule,
    UsersModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
