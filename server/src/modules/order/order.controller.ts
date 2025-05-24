import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { PlaceOrderDto } from './dto/place-order.dto';
import { JwtAuthGuard } from '../auth/common/guards/jwt.guard';
import { RequestWithUser } from '../common/types/express-request.interface';
import { Types } from 'mongoose';
import { RolesGuard } from '../auth/common/guards/roles.guard';
import { Roles } from '../auth/common/decorators/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('place')
  placeOrder(@Req() req: RequestWithUser, @Body() dto: PlaceOrderDto) {
    return this.orderService.placeOrder(req.user.userId, dto);
  }

  @Get('my-orders')
  async getUserOrders(@Req() req: RequestWithUser) {
    return this.orderService.getOrdersByUser(req.user.userId);
  }

  @Get(':id')
  async getOrderById(@Req() req: RequestWithUser, @Param('id') id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid order ID');
    }

    const order = await this.orderService.getOrderById(req.user.userId, id);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('get/:status')
  async getAllOrdersForAdmin(@Param('status') status: string) {
    return this.orderService.getAllOrders(status);
  }

  @Patch('status/:orderId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async updateOrderStatus(
    @Param('orderId') orderId: string,
    @Body('status') status: string,
  ) {
    return this.orderService.updateOrderStatus(orderId, status);
  }
}
