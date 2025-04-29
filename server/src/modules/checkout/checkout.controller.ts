import { Controller, Post, Body, Req } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';
import { RequestWithUser } from '../common/types/express-request.interface';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('applyCoupon')
  async applyCoupon(
    @Req() req: RequestWithUser,
    @Body('couponCode') couponCode?: string,
  ) {
    return this.checkoutService.applyCouponCode(req.user.userId, couponCode);
  }

  @Post('create')
  async createCheckout(
    @Req() req: RequestWithUser,
    @Body() checkoutDto: CheckoutDto,
  ) {
    return this.checkoutService.createCheckout(req.user.userId, checkoutDto);
  }
}
