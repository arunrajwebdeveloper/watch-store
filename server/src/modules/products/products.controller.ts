import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getAll(@Query() filter: FilterProductDto) {
    return this.productService.findAll(filter);
  }

  @Get('recent-products')
  getLatestProducts(@Query('limit') limit?: string) {
    const parsedLimit = parseInt(limit || '', 10);
    const finalLimit = !isNaN(parsedLimit) && parsedLimit > 0 ? parsedLimit : 6;
    return this.productService.getLatestProducts(finalLimit);
  }

  @Get('filter-options')
  getFilterOptions() {
    return this.productService.getFilterOptions();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  // @Put('edit/:id')
  // update(@Param('id') id: string, @Body() dto: CreateProductDto) {
  //   return this.productService.update(id, dto);
  // }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.patch(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
