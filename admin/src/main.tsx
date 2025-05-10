import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Master } from "./master";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Master />
    </BrowserRouter>
  </StrictMode>
);
