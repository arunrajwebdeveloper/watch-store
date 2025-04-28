import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon, PromocodeType } from './schemas/coupon.schema';
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

    if (!coupon || !coupon.isActive) {
      throw new NotFoundException('Coupon not found or inactive');
    }

    return coupon;
  }

  async applyCoupon(cartTotal: number, code: string): Promise<number> {
    const coupon = await this.findCouponByCode(code);

    // Check expiry date
    const currentDate = new Date();
    if (coupon.expiry < currentDate) {
      throw new BadRequestException('Coupon has expired');
    }

    // Check usage limit
    if (coupon.usedCount >= coupon.usageLimit) {
      throw new BadRequestException('Coupon usage limit reached');
    }

    // Calculate the discount
    let discountAmount = 0;
    if (coupon.type === PromocodeType.FIXED) {
      discountAmount = coupon.discount;
    } else if (coupon.type === PromocodeType.PERCENTAGE) {
      discountAmount = (cartTotal * coupon.discount) / 100;
    }

    // Apply the discount
    const newTotal = cartTotal - discountAmount;

    // Update the used count
    await this.couponModel.updateOne(
      { _id: coupon._id },
      { $inc: { usedCount: 1 } },
    );

    return newTotal;
  }
}
