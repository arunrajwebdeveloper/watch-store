import { Link, useParams } from "react-router-dom";
import { useUsers } from "../hook";
import moment from "moment";
import { PageLayout } from "../../../layouts";

function User() {
  const { id: userId } = useParams();

  const { fetchUsersById } = useUsers({ userId });

  const { data, isError } = fetchUsersById;

  if (isError) return <span>Error Occured</span>;

  return (
    <PageLayout title="User Details">
      <table>
        <tbody>
          <tr>
            <td colSpan={2}>
              <img
                src={data?.avatar}
                alt={data?.firstName.toString()}
                style={{ width: "100px" }}
                loading="lazy"
              />
            </td>
          </tr>
          <tr>
            <td>Name:</td>
            <td>{data?.firstName}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{data?.email}</td>
          </tr>
          <tr>
            <td>Role:</td>
            <td>{data?.role}</td>
          </tr>
          <tr>
            <td>Created At:</td>
            <td>
              {moment(data?.createdAt).format("DD MMM YYYY [at] hh:mm A")}
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Link to=".">Edit user</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </PageLayout>
  );
}

export default User;
