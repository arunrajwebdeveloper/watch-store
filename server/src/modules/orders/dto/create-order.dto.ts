import {
  IsArray,
  IsMongoId,
  IsNumber,
  Min,
  IsObject,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../enums/order-status.enum';
import { AddressDto } from '../../users/dto/address.dto';

export class CreateOrderDto {
  @IsArray()
  @IsMongoId({ each: true })
  products: string[];

  @IsNumber()
  @Min(1)
  amount: number;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;
}
