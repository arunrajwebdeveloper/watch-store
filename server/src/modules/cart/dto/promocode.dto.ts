import { IsString } from 'class-validator';

export class PromocodeDto {
  @IsString()
  couponCode: string;
}
