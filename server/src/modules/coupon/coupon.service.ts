import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Coupon } from './schemas/coupon.schema';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Injectable()
export class CouponService {
  constructor(@InjectModel(Coupon.name) private couponModel: Model<Coupon>) {}

  async createCoupon(createCouponDto: CreateCouponDto): Promise<Coupon> {
    const couponExists = await this.couponModel.findOne({
      code: createCouponDto.code,
    });

    if (couponExists) {
      throw new BadRequestException('Coupon already exists');
    }

    const coupon = new this.couponModel(createCouponDto);
    return coupon.save();
  }

  async findCouponByCode(code: string): Promise<Coupon> {
    const coupon = await this.couponModel.findOne({ code });

    if (!coupon) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid coupon code',
        error: 'INVALID_COUPON_CODE',
      });
    }

    // Check expiry date
    const currentDate = new Date();
    if (coupon.expiry < currentDate) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Coupon has expired',
        error: 'COUPON_EXPIRED',
      });
    }

    // Check usage limit
    if (coupon.usedCount >= coupon.usageLimit) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Coupon usage limit reached',
        error: 'COUPON_USAGE_LIMIT_REACHED',
      });
    }

    return coupon;
  }

  async updateCouponUsedCount(couponId: string, session?: ClientSession) {
    await this.couponModel.findByIdAndUpdate(
      { _id: couponId },
      { $inc: { usedCount: 1 } },
      { session },
    );
  }
}
