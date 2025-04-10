import { AddressDto } from '../../common/dto/address.dto';

export class UserDetailsDto extends AddressDto {
  name: string;
  avatar: string;
}
