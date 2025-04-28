import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ApplyCouponDto } from './dto/apply-coupon.dto';

@Controller('coupon')
@UseGuards(JwtAuthGuard)
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @UseGuards(JwtAuthGuard)
  @Post('apply')
  async apply(@Body() applyCouponDto: ApplyCouponDto) {
    const { cartTotal, code } = applyCouponDto;
    return this.couponService.applyCoupon(cartTotal, code);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() code: CreateCouponDto) {
    return this.couponService.createCoupon(code);
  }
}
