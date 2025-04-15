import React from "react";

function Grid({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="section-grid">{children}</div>;
}

export default Grid;
