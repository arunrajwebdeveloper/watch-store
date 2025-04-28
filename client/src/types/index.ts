export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
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
