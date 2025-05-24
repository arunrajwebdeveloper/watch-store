import type { ReactNode } from "react";
import { Header } from "../shared";

export const PageLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="content-section">
      <Header />
      <main className="main-wrapper px-4">
        {title && (
          <div className="page-header">
            <h2>{title}</h2>
          </div>
        )}
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};
