import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import * as dotenv from 'dotenv';
import { ProductsModule } from './modules/products/products.module';

dotenv.config();

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in .env file');
}
@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
