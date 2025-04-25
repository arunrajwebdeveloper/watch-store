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

  @IsNumber()
  weight: number;

  @IsString()
  color: string;

  @IsString()
  size: string;

  @IsEnum(['analog', 'automatic', 'digital', 'smart', 'chronograph'])
  movementType: 'analog' | 'automatic' | 'digital' | 'smart' | 'chronograph';

  @IsEnum(['male', 'female'])
  gender: 'male' | 'female';

  images?: string[];

  inventory: number;
}
