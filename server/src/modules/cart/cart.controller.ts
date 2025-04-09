import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { RequestWithUser } from '../../common/types/express-request.interface';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Req() req: RequestWithUser) {
    return this.cartService.getUserCart(req.user.userId);
  }

  @Post('add')
  addToCart(@Req() req: RequestWithUser, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(req.user.userId, dto);
  }

  @Delete('remove/:productId')
  removeFromCart(
    @Req() req: RequestWithUser,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(req.user.userId, productId);
  }

  @Post('clear')
  clearCart(@Req() req: RequestWithUser) {
    return this.cartService.clearCart(req.user.userId);
  }
}
