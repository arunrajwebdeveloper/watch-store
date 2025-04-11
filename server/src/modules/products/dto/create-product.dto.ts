import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  originalPrice: number;

  @IsNumber()
  currentPrice: number;

  @IsString()
  color: string;

  @IsString()
  size: string;

  @IsEnum(['quartz', 'automatic', 'digital', 'smart'])
  movementType: 'quartz' | 'automatic' | 'digital' | 'smart';

  images?: string[];
}
