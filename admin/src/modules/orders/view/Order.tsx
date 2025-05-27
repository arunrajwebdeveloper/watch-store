import { Link, useParams } from "react-router-dom";
import { useOrders } from "../hook";
import moment from "moment";
import { PageLayout } from "../../../layouts";
import { currencyFormatter } from "../../../utils";

function Product() {
  const { orderId } = useParams();

  console.log("orderId :>> ", orderId);

  const { fetchOrderDetails } = useOrders({ orderId });

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

  function mergeObjectValues(
    obj: Record<string, any>,
    keysToJoin: string[]
  ): string {
    return keysToJoin
      .map((key) => obj[key])
      .filter((value) => value !== undefined && value !== null)
      .join(", ");
  }

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
                  <div>
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
            <td>{status}</td>
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
          <tr>
            <td colSpan={2}>
              <Link to={`../edit/${orderId}`}>Edit</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </PageLayout>
  );
}

export default Product;
