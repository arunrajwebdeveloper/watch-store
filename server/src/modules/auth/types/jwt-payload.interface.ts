export interface JwtPayload {
  sub: string; // user ID
  email: string;
  role: 'customer' | 'admin'; // or use Role enum if you prefer
  iat?: number; // issued at
  exp?: number; // expiry time
}
