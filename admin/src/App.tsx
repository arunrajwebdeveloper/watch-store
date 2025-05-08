import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/orders">Tabs</Link>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="orders" element={<h1>Orders</h1>} />
      </Routes>
    </>
  );
}

export default App;
