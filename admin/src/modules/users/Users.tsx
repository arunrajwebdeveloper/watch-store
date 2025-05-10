import { Link, Route, Routes } from "react-router-dom";
import User from "../../components/User";

function Users() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h4>User list</h4>
              <Link to="12">User 12</Link>
            </div>
          }
        />
        <Route path="/:id" element={<User />} />
      </Routes>
    </div>
  );
}

export default Users;
