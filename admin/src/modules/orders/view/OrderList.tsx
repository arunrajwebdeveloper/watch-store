import { Link } from "react-router-dom";
import { useOrders } from "../hook";
import moment from "moment";
import { currencyFormatter } from "../../../utils";
import OrderStatusPill from "../components/OrderStatusPill";

export const OrderList = ({
  title,
  status,
}: {
  title: string;
  status: string;
}) => {
  const { fetchOrders } = useOrders({ load: true, status });
  const { data, isError } = fetchOrders;

  if (isError) return <span>Error occured</span>;

  return (
    <div>
      <h4 className="sub-heading">{title}</h4>
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th>#</th>
              <th>Order Id</th>
              <th>Order Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {data?.length > 0 ? (
              data?.map((order: any, idx: number) => {
                return (
                  <tr key={order._id}>
                    <td valign="middle">{++idx}</td>
                    <td valign="middle">
                      <Link to=".">{order._id}</Link>
                    </td>
                    <td valign="middle">
                      {moment(order?.createdAt).format(
                        "DD MMM YYYY [at] hh:mm A"
                      )}
                    </td>
                    <td valign="middle">
                      {currencyFormatter(+order?.totalAmount)}
                    </td>
                    <td valign="middle">
                      <OrderStatusPill status={order?.status} />
                    </td>
                    <td valign="middle">
                      <Link to=".">View</Link> &nbsp;
                      <Link to=".">Edit</Link> &nbsp;
                      <Link to=".">Delete</Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={20}
                  style={{ textAlign: "center" }}
                  valign="middle"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
