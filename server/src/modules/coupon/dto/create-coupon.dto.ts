import {
  IsString,
  IsInt,
  IsEnum,
  IsDateString,
  Min,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { PromocodeType } from '../schemas/coupon.schema';

export class CreateCouponDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsInt()
  @Min(0)
  discount: number; // {FIXED: 200 = INR200, PERCENTAGE: 0.1 = 10%}

  @IsDateString()
  expiry: Date;

  @IsEnum(PromocodeType)
  type: PromocodeType;

  @IsInt()
  @Min(1)
  usageLimit: number;

  @IsInt()
  @Min(0)
  usedCount: number;

  @IsBoolean()
  isActive: boolean;
}
