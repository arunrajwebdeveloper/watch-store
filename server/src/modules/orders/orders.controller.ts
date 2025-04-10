import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
  Body,
  Headers,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { RequestWithUser } from 'src/modules/common/types/express-request.interface';
import { RolesGuard } from 'src/modules/common/guards/roles.guard';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Roles } from 'src/modules/common/decorators/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Req() req: RequestWithUser, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.userId, dto);
  }

  @Get()
  getOrders(@Req() req: RequestWithUser) {
    return this.ordersService.getOrders(req.user.userId);
  }

  @Get(':orderId')
  getOrder(@Req() req: RequestWithUser, @Param('orderId') orderId: string) {
    return this.ordersService.getOrderById(req.user.userId, orderId);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateStatus(
    @Param('id') orderId: string,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(orderId, dto.status);
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
