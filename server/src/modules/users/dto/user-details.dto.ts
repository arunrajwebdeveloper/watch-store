import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AddressDto } from '../../common/dto/address.dto';

export class UserDetailsDto extends AddressDto {
  @IsOptional()
  @IsString()
  avatar?: string;
}
