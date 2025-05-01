"use client";
import { useEffect } from "react";
import Script from "next/script";
import { useAppDispatch } from "@/store";
import { placeOrder } from "@/store/slices/paymentSlice";
import { useRouter } from "next/navigation";
import { CreatePaymentResponse } from "@/types/payment";

const RazorpayButton = ({
  orderData,
}: {
  orderData: CreatePaymentResponse;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    //  check if Razorpay is loaded
    if (!(window as any).Razorpay) {
      console.info("Razorpay SDK not loaded");
    }
  }, []);

  const handlePayment = () => {
    const options = {
      key: orderData?.key,
      amount: orderData?.amount,
      currency: orderData?.currency,
      order_id: orderData?.razorpayOrderId,
      handler: async function (response: any) {
        dispatch(
          placeOrder({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          })
        );
        console.log("Order success:", response.data);
        router.push("/order-success"); // Redirect after success
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      <button onClick={handlePayment} className="btn primary">
        Pay ₹{orderData?.amount / 100}
      </button>
    </>
  );
};

export default RazorpayButton;
