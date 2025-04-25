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

export interface CartState {
  cartItems: any[];
  cartItemCount: number;
  isLoading: boolean;
  cartTotalAmount: number;
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
