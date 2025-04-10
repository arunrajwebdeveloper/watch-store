import { IsNotEmpty } from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  contact: string;

  @IsNotEmpty()
  address: string;

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
