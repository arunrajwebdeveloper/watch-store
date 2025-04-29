import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { CartModule } from '../cart/cart.module';
import { CouponModule } from '../coupon/coupon.module';
import { UsersModule } from '../users/users.module';
import { Checkout, CheckoutSchema } from './schemas/checkout.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checkout.name, schema: CheckoutSchema },
    ]),
    CartModule,
    UsersModule,
    CouponModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
