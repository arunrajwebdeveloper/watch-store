"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import "@/styles/order/order.style.css";
import Link from "next/link";

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
          <div className="status-banner success">
            <div className="container">
              <div className="status-content">
                <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.0303 10.0303C16.3232 9.73744 16.3232 9.26256 16.0303 8.96967C15.7374 8.67678 15.2626 8.67678 14.9697 8.96967L10.5 13.4393L9.03033 11.9697C8.73744 11.6768 8.26256 11.6768 7.96967 11.9697C7.67678 12.2626 7.67678 12.7374 7.96967 13.0303L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L16.0303 10.0303Z"
                    fill="#ffffff"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z"
                    fill="#ffffff"
                  />
                </svg>
                <h3 className="status-page-title ">
                  Order Placed Successfully!
                </h3>

                <div className="infos">
                  <p>Order ID: {orderDetails._id}</p>
                  <p>Payment ID: {orderDetails.payment?.razorpayPaymentId}</p>
                  <p className="lg">
                    Total Amount: ₹{orderDetails.totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="order-details-block">
              <h2 className="sub-heading">Products</h2>
              <table className="ordered-product-list">
                <tbody>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Qty</th>
                  </tr>
                  {orderDetails.items.map((item: any, idx: number) => {
                    return (
                      <tr key={item._id}>
                        <td>{++idx}</td>
                        <td>
                          <div>
                            <h5>{item.brand}</h5>
                            <p>{item.product?.model || item.productId}</p>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="back-link">
                <Link href="/products">Continue shopping</Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (status === "order_failed") {
      return (
        <div className="status-banner failed">
          <div className="container">
            <h3 className="status-page-title ">
              Payment succeeded but order failed. Please contact support or try
              again.
            </h3>
          </div>
        </div>
      );
    }

    if (status === "payment_failed") {
      return (
        <div className="status-banner failed">
          <div className="container">
            <h3 className="status-page-title">
              Payment failed. Please try again or use a different method.
            </h3>
          </div>
        </div>
      );
    }

    if (status === "cancelled") {
      return (
        <div className="status-banner cancelled">
          <div className="container">
            <h3 className="status-page-title ">
              Payment was cancelled. You can go back to retry.
            </h3>
          </div>
        </div>
      );
    }

    return (
      <div className="status-banner invalid">
        <div className="container">
          <h3 className="status-page-title ">Invalid status</h3>
        </div>
      </div>
    );
  };

  return <div className="status-page-wrapper">{renderContent()}</div>;
}
