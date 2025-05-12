import { Route, Routes } from "react-router-dom";
import User from "./view/User";
import { UserList } from "./view/UserList";

export default function Users() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserList title="Users" />} />
        <Route path="/:id" element={<User title="User Details" />} />
      </Routes>
    </div>
  );
}
