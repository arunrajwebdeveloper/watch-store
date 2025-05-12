import { useOrders } from "../hook";

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
            </tr>
            {data?.length > 0 ? (
              data?.map((order: any, idx: number) => {
                return (
                  <tr key={order._id}>
                    <td>{++idx}</td>
                    <td>{order._id}</td>
                    <td>{order?.createdAt}</td>
                    <td>{order?.totalAmount}</td>
                    <td>{order?.status}</td>
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
