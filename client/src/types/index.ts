export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  firstName: string;
  lastName: string;
}

export interface ResetInput {
  email: string;
}

export interface AuthState {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AppliedCoupon {
  code: string;
  discountAmount: number;
  promocodeType: string;
}

export interface AddressInput {
  fullname: string;
  contact: string;
  address: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  tag: string;
}

export interface AddressResponse {
  _id: string;
  address: string;
  city: string;
  contact: string;
  country: string;
  fullname: string;
  isDefault: boolean;
  postalCode: string;
  state: string;
  street: string;
  tag: string;
  userId: string;
}
export interface CartState {
  cartItems: any[];
  cartItemCount: number;
  isLoading: boolean;
  isCartEmpty: boolean;
  isUpdatingCart: boolean;
  cartTotalAmount: number;
  cartFinalTotalAmount: number;
  cartDiscountAmount: number;
  appliedCoupon: AppliedCoupon | null;
  gstPercentage: number;
  gstAmount: number;
  shippingFee: number;
  couponError: any | null;
  isApplyingCoupon: boolean;
  address: AddressResponse | null;
  isUpdatingDeliveryAddress: boolean;
  UpdateDeliveryAddressError: any | null;
}

export interface CartInput {
  productId: string;
  quantity: number;
}

export interface WishlistInput {
  productId: string;
}

export interface WishlistState {
  wishlistItems: any[];
  isLoading: boolean;
}
