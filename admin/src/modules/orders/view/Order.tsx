import { useParams } from "react-router-dom";
import { useOrders } from "../hook";
import moment from "moment";
import { PageLayout } from "../../../layouts";
import { currencyFormatter } from "../../../utils";
import { useEffect, useState } from "react";

function Product() {
  const [orderStatus, setOrderStatus] = useState("");
  const { orderId } = useParams();

  const { fetchOrderDetails, updateOrderStatus } = useOrders({ orderId });

  const { isError, data } = fetchOrderDetails;

  if (isError) return <span>Error Occured</span>;

  const {
    address,
    coupon,
    items,
    payment,
    status,
    // statusHistory,
    totalAmount,
    userId,
    _id,
    createdAt,
  } = !!data && data;

  useEffect(() => {
    if (data) {
      setOrderStatus(status);
    }
  }, [data]);

  function mergeObjectValues(
    obj: Record<string, any>,
    keysToJoin: string[]
  ): string {
    return keysToJoin
      .map((key) => obj[key])
      .filter((value) => value !== undefined && value !== null)
      .join(", ");
  }

  const statusColors = (status: string) => {
    return {
      placed: "bg-primary text-light",
      processing: "bg-info text-dark",
      shipped: "bg-warning text-dark",
      delivered: "bg-success text-light",
      cancelled: "bg-danger text-light",
    }[status];
  };

  const orderStatusList: { label: string; value: string }[] = [
    {
      label: "Placed",
      value: "placed",
    },
    {
      label: "Processing",
      value: "processing",
    },
    {
      label: "Shipped",
      value: "shipped",
    },
    {
      label: "Delivered",
      value: "delivered",
    },
    {
      label: "Cancelled",
      value: "cancelled",
    },
  ];

  const onUpdateStatus = () => {
    updateOrderStatus.mutate({ status: orderStatus });
  };

  type Product = { brand: string; model: string };
  type Props = {
    product: Product;
    quantity: number;
  };

  return (
    <PageLayout title={`Order - ${_id}`}>
      <table>
        <tbody>
          <tr>
            <td>Ordered Items:</td>
            <td>
              {items?.map(({ product, quantity }: Props) => {
                return (
                  <div key={product.model}>
                    <p className="m-0">
                      <strong>{product.brand}</strong> |{" "}
                      <span>{product.model}</span>
                    </p>
                    <p className="m-0">
                      Quantity: <strong>{quantity} items</strong>
                    </p>
                  </div>
                );
              })}
            </td>
          </tr>
          <tr>
            <td>Total Amount:</td>
            <td>
              <strong>{currencyFormatter(+totalAmount)}</strong>
            </td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>
              <div className="d-flex align-items-center gap-1">
                <select
                  onChange={(e) => {
                    setOrderStatus(e?.target?.value);
                  }}
                  value={orderStatus}
                  className={`p-1 border-0 rounded ${statusColors(
                    orderStatus
                  )}`}
                  style={{ outline: 0 }}
                >
                  {orderStatusList?.map((status) => {
                    return (
                      <option key={status?.value} value={status?.value}>
                        {status?.label}
                      </option>
                    );
                  })}
                </select>
                <button
                  className="btn btn-dark py-1 px-1 small"
                  onClick={onUpdateStatus}
                  disabled={
                    updateOrderStatus.isPending ||
                    !orderStatus ||
                    orderStatus === status
                  }
                >
                  Update
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Payment Details:</td>
            <td>
              <p className="m-0">Method: {payment?.method}</p>
              <p className="m-0">
                Razorpay Order Id: {payment?.razorpayOrderId}
              </p>
              <p className="m-0">
                Razorpay Payment Id: {payment?.razorpayPaymentId}
              </p>
            </td>
          </tr>
          <tr>
            <td>Ordered By:</td>
            <td>
              <div className="d-flex align-items-center gap-3">
                <div>
                  <img
                    style={{ width: "80px", height: "80px" }}
                    src={userId?.avatar}
                    alt={userId?.firstName?.toString()}
                  />
                </div>
                <div>
                  <p className="m-0">{`${userId?.firstName} ${userId?.lastName}`}</p>
                  <p className="m-0">{userId?.email}</p>
                </div>
              </div>
            </td>
          </tr>
          {coupon && (
            <tr>
              <td>Coupon:</td>
              <td>
                <p className="m-0">Code: {coupon?.code}</p>
                <p className="m-0">Discount: {coupon?.discount}</p>
                <p className="m-0">Discount Type: {coupon?.discountType}</p>
              </td>
            </tr>
          )}
          {address && (
            <tr>
              <td>Address:</td>
              <td>
                {mergeObjectValues(address, [
                  "fullname",
                  "address",
                  "street",
                  "city",
                  "state",
                  "country",
                  "postalCode",
                ])}
              </td>
            </tr>
          )}
          <tr>
            <td>Ordered At:</td>
            <td>{moment(createdAt).format("DD MMM YYYY [at] hh:mm A")}</td>
          </tr>
        </tbody>
      </table>
    </PageLayout>
  );
}

export default Product;
