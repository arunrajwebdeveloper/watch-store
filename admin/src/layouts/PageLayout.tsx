import type { ReactNode } from "react";
import { Header } from "../shared";
import { Sidebar } from "../components";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="master-wrapper">
      <Sidebar />
      <div className="content-section">
        <Header />
        <main className="main-wrapper">{children}</main>
        <h2>Footer</h2>
      </div>
    </div>
  );
};
