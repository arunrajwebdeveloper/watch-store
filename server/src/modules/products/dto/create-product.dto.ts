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

  @IsEnum(['analog', 'automatic', 'digital', 'smart'])
  movementType: 'analog' | 'automatic' | 'digital' | 'smart';

  @IsEnum(['male', 'female'])
  gender: 'male' | 'female';

  images?: string[];
}
