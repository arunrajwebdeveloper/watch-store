import { Route, Routes } from "react-router-dom";
import { Statistics } from "./view";

export default function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<Statistics />} />
    </Routes>
  );
}
