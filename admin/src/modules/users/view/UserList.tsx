import { Link } from "react-router-dom";
import { useUsers } from "../hook";
import moment from "moment";
import { PageLayout } from "../../../layouts";

export const UserList = () => {
  const { fetchUsers } = useUsers({ load: true });
  const { data, isError } = fetchUsers;

  if (isError) return <span>Error occured</span>;

  return (
    <PageLayout title="Users List">
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Joined In</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          {data?.length > 0 ? (
            data?.map((user: any, idx: number) => {
              return (
                <tr key={user._id}>
                  <td>{++idx}</td>
                  <td>
                    <img
                      src={user?.avatar}
                      alt={user?.firstName.toString()}
                      style={{ width: "100px" }}
                      loading="lazy"
                    />
                  </td>
                  <td>{user?.firstName}</td>
                  <td>{user?.email}</td>
                  <td>
                    {moment(user?.createdAt).format("DD MMM YYYY [at] hh:mm A")}
                  </td>
                  <td>{user?.role}</td>
                  <td>
                    <Link to={user._id}>View</Link>
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
    </PageLayout>
  );
};
