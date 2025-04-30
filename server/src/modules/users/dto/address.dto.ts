import { IsBoolean, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;

  @IsString()
  @IsIn(['home', 'office'])
  tag: string;
}
