import { Route, Routes } from "react-router-dom";
import { Statistics } from "./view";

export function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<Statistics />} />
    </Routes>
  );
}
