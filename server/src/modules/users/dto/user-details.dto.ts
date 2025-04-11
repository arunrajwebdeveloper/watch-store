import { IsNotEmpty, IsOptional, IsString, IsMongoId } from 'class-validator';
import { AddressDto } from '../../common/dto/address.dto';

export class UserDetailsDto extends AddressDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatar?: string;
}
