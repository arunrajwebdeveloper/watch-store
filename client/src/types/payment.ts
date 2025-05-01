export interface CreatePaymentResponse {
  razorpayOrderId: string;
  amount: number;
  currency: string;
  key: string;
}

export interface RazorpayResult {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}
