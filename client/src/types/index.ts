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
