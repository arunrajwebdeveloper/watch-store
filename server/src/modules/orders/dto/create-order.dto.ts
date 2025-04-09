import { IsArray, IsMongoId, IsNumber, Min } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsMongoId({ each: true })
  products: string[];

  @IsNumber()
  @Min(1)
  amount: number;
}
