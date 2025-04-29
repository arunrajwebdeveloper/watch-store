export class CheckoutDto {
  address: string;
  paymentMethod: string;
  couponCode?: string;
  items: string[]; // Cart item IDs
}
