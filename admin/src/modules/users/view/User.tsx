import { Link, useParams } from "react-router-dom";
import { useUsers } from "../hook";
import moment from "moment";

function User({ title }: { title: string }) {
  const { id: userId } = useParams();

  const { fetchUsersById } = useUsers({ load: true, userId });

  const { data, isError } = fetchUsersById;

  if (isError) return <span>Error Occured</span>;

  return (
    <div>
      <div>
        <h4>{title}</h4>
      </div>
      <div>
        <table>
          <tbody>
            <tr>
              <td colSpan={2}>
                <img
                  src={data?.avatar}
                  alt={data?.name.toString()}
                  style={{ width: "100px" }}
                  loading="lazy"
                />
              </td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{data?.name}</td>
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
      </div>
    </div>
  );
}

export default User;
