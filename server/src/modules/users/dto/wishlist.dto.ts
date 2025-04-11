import { IsNotEmpty, IsMongoId } from 'class-validator';

export class WishlistDto {
  @IsNotEmpty()
  @IsMongoId()
  productId: string;
}
