import { Route, Routes } from "react-router-dom";
import User from "./view/User";
import { UserList } from "./view/UserList";

export default function Users() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/:id" element={<User />} />
      </Routes>
    </div>
  );
}
