import type { ReactNode } from "react";
import { Header, Sidebar } from "../shared";

export const PageLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="master-wrapper">
      <Sidebar />
      <div className="content-section">
        <Header />
        <main className="main-wrapper">
          {title && (
            <div className="page-header">
              <h2>{title}</h2>
            </div>
          )}
          <div className="page-content">{children}</div>
        </main>
      </div>
    </div>
  );
};
