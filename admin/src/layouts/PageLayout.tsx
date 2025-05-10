import type { ReactNode } from "react";
// import { Header } from "shared";

export const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {/* <Header /> */}
      <div style={{ maxWidth: "980px", margin: "auto" }}>{children}</div>
    </>
  );
};
