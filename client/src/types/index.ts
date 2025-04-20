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
}

export interface CartUpdateInput {
  quantity: number;
}

export interface CartInput extends CartUpdateInput {
  productId: string;
}

export interface WishlistInput {
  productId: string;
}
