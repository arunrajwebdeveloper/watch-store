"use client";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
// import PrivateRoute from "../../utils/privateRoute";
import { AppDispatch } from "../store";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>(); // ✅ typed dispatch

  const handleLogout = async () => {
    await dispatch(logoutUser());
    window.location.href = "/login";
  };

  return (
    // <PrivateRoute>
    <div>
      <h1>Welcome Home!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
    // </PrivateRoute>
  );
}
