import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { PlaceOrderDto } from './dto/place-order.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RequestWithUser } from '../common/types/express-request.interface';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('place')
  placeOrder(@Req() req: RequestWithUser, @Body() dto: PlaceOrderDto) {
    return this.orderService.placeOrder(req.user.userId, dto);
  }
}
