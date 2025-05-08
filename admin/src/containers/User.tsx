import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();

  return <h4>User id: {id}</h4>;
}

export default User;
