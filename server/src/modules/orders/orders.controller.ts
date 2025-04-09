import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
  Body,
  Headers,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { RequestWithUser } from 'src/common/types/express-request.interface';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Req() req: RequestWithUser, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.userId, dto);
  }

  @Post('checkout')
  checkout(@Req() req: RequestWithUser) {
    return this.ordersService.checkout(req.user.userId);
  }

  @Get()
  getOrders(@Req() req: RequestWithUser) {
    return this.ordersService.getOrders(req.user.userId);
  }

  @Get(':orderId')
  getOrder(@Req() req: RequestWithUser, @Param('orderId') orderId: string) {
    return this.ordersService.getOrderById(req.user.userId, orderId);
  }

  @UseGuards()
  @Post('webhook')
  async handleWebhook(
    @Body() body: any,
    @Headers('x-razorpay-signature') razorpaySignature: string,
  ) {
    await this.ordersService.handleWebhook(body, razorpaySignature);
    return { status: 'ok' };
  }
}
