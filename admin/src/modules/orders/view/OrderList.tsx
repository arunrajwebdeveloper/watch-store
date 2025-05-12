import { Link } from "react-router-dom";
import { useOrders } from "../hook";
import moment from "moment";

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
      <div>
        <h4>{title}</h4>
      </div>
      <div>
        <table>
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
                    <td>{++idx}</td>
                    <td>{order._id}</td>
                    <td>
                      {moment(order?.createdAt).format(
                        "DD MMM YYYY [at] hh:mm A"
                      )}
                    </td>
                    <td>INR {order?.totalAmount}</td>
                    <td>{order?.status}</td>
                    <td>
                      <Link to=".">Edit</Link> &nbsp;
                      <Link to=".">Delete</Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={20} style={{ textAlign: "center" }}>
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
