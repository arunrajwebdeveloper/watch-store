import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AdminAuthModule } from './modules/auth/admin-auth/admin-auth.module';
import { ClientAuthModule } from './modules/auth/client-auth/client-auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { PaymentModule } from './modules/payment/payment.module';
import { OrderModule } from './modules/order/order.module';
import * as dotenv from 'dotenv';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { EmailModule } from './modules/email/email.module';
import { EventsModule } from './modules/events/events.module';

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in .env file');
}
@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    EventEmitterModule.forRoot({
      wildcard: true, // Enables * and ** pattern matching
      delimiter: '.', // enables 'user.*' or 'order.**' , if use : 'user:*' or 'order:**'
    }),
    AdminAuthModule,
    ClientAuthModule,
    UsersModule,
    ProductsModule,
    CartModule,
    WishlistModule,
    CouponModule,
    PaymentModule,
    OrderModule,
    DashboardModule,
    EmailModule,
    EventsModule,
  ],
})
export class AppModule {}
