import type { ReactNode } from "react";
import { Sidebar } from "../shared";

export const GlobalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="master-wrapper">
      <Sidebar />
      {children}
    </div>
  );
};
