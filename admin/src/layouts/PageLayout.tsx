import type { ReactNode } from "react";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h2>Header</h2>
      <main className="main-wrapper">{children}</main>
      <h2>Footer</h2>
    </>
  );
};
