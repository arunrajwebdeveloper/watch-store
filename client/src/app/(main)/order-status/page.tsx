"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function OrderStatusPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");

  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (status === "success" && orderId) {
        setLoading(true);
        try {
          const res = await api.get(`/orders/${orderId}`);
          setOrderDetails(res.data);
        } catch (err) {
          console.error("Failed to load order", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrder();
  }, [status, orderId]);

  const renderContent = () => {
    if (status === "success") {
      if (loading) return <p>Loading order details...</p>;
      if (!orderDetails) return <p>Order not found.</p>;

      return (
        <div>
          <h1 className="">Order Placed Successfully!</h1>
          <p>Order ID: {orderDetails._id}</p>
          <p>Total Amount: ₹{orderDetails.totalAmount}</p>
          <p>Payment ID: {orderDetails.payment?.razorpayPaymentId}</p>
          <h2 className="text-lg mt-4">Items:</h2>
          <ul>
            {orderDetails.items.map((item: any, idx: number) => (
              <li key={idx}>
                Product: {item.product?.model || item.productId}, Qty:{" "}
                {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (status === "order_failed") {
      return (
        <p className="text-red-600">
          Payment succeeded but order failed. Please contact support or try
          again.
        </p>
      );
    }

    if (status === "payment_failed") {
      return (
        <p className="text-red-600">
          Payment failed. Please try again or use a different method.
        </p>
      );
    }

    if (status === "cancelled") {
      return (
        <p className="text-yellow-600">
          Payment was cancelled. You can go back to retry.
        </p>
      );
    }

    return <p>Invalid status</p>;
  };

  return <div className="">{renderContent()}</div>;
}
