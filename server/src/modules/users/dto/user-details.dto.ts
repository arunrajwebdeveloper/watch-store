import { IsNotEmpty, IsOptional } from 'class-validator';
import { AddressDto } from '../../common/dto/address.dto';

export class UserDetailsDto extends AddressDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  avatar?: string;
}
