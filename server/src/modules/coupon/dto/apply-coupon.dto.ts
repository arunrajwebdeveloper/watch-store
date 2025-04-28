import { IsString, IsNumber, Min } from 'class-validator';

export class ApplyCouponDto {
  @IsString()
  code: string;

  @IsNumber()
  @Min(0)
  cartTotal: number;
}
