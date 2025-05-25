function OrderStatusPill({ status }: { status: string }) {
  const statusElement =
    {
      placed: (
        <span className="badge bg-primary py-2 px-2 user-select-none">
          Placed
        </span>
      ),
      processing: (
        <span className="badge bg-info text-dark py-2 px-2 user-select-none">
          Processing
        </span>
      ),
      shipped: (
        <span className="badge bg-warning text-dark py-2 px-2 user-select-none">
          Shipped
        </span>
      ),
      delivered: (
        <span className="badge bg-success py-2 px-2 user-select-none">
          Delivered
        </span>
      ),
      cancelled: (
        <span className="badge bg-danger py-2 px-2 user-select-none">
          Cancelled
        </span>
      ),
    }[status] || null;

  return statusElement;
}

export default OrderStatusPill;
