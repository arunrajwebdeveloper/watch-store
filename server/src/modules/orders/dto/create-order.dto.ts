import {
  IsArray,
  IsMongoId,
  IsNumber,
  Min,
  IsNotEmpty,
  IsObject,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../enums/order-status.enum';

class AddressDto {
  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  postalCode: string;

  @IsNotEmpty()
  country: string;
}

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
