import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/common/guards/jwt.guard';
import { RolesGuard } from '../auth/common/guards/roles.guard';
import { Roles } from '../auth/common/decorators/roles.decorator';
import { AddressDto } from './dto/address.dto';
import { RequestWithUser } from '../common/types/express-request.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // FOR CUSTOMERS ONLY
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUserProfile(@Req() req: RequestWithUser) {
    return this.usersService.findClientUser(req.user.userId);
  }

  // FOR ADMIN USER ONLY
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/me')
  @Roles('admin')
  getProfile(@Req() req: RequestWithUser) {
    return this.usersService.findAdminUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('address/add')
  addAddress(@Req() req: RequestWithUser, @Body() dto: AddressDto) {
    return this.usersService.addAddress(req.user.userId, dto);
  }

  // edit user
  // delete user
  // block user (ADMIN)
}
