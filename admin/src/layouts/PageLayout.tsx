import type { ReactNode, ComponentType } from "react";
import { Header } from "../shared";

export const PageLayout = ({
  children,
  title,
  Component,
}: {
  children: ReactNode;
  title?: string;
  Component?: ComponentType<any>;
}) => {
  return (
    <div className="content-section">
      <Header />
      <main className="main-wrapper px-4">
        {title && (
          <div className="page-header d-flex align-items-center justify-content-between">
            <h2>{title}</h2>
            {Component && (
              <div className="page-header-right ">
                <Component />
              </div>
            )}
          </div>
        )}
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
};
