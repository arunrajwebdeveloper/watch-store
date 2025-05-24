import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from '../common/types/express-request.interface';
import { JwtAuthGuard } from '../auth/common/guards/jwt.guard';
import { WishlistService } from './wishlist.service';
import { AddToWishlistDto } from './dto/add-to-wishlist.dto';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getWishlist(@Req() req: RequestWithUser) {
    return this.wishlistService.getWishlist(req.user.userId);
  }

  @Post('add')
  addToWishlist(@Req() req: RequestWithUser, @Body() dto: AddToWishlistDto) {
    return this.wishlistService.addToWishlist(req.user.userId, dto);
  }

  @Delete('remove/:productId')
  removeFromWishlist(
    @Req() req: RequestWithUser,
    @Param('productId') productId: string,
  ) {
    return this.wishlistService.removeFromWishlist(req.user.userId, productId);
  }

  @Post('clear')
  clearWishlist(@Req() req: RequestWithUser) {
    return this.wishlistService.clearWishlist(req.user.userId);
  }
}
