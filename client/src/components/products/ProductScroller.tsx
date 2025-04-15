import React from "react";

type ProductScrollerProps = Readonly<{
  title: string | null;
  children: React.ReactNode;
}>;

function ProductScroller({ children, title = null }: ProductScrollerProps) {
  return (
    <div className="product-scroller-section">
      {title && (
        <div className="product-scroller__header">
          <h2>{title}</h2>
        </div>
      )}
      <div className="product-scroller">{children}</div>
    </div>
  );
}

export default ProductScroller;
