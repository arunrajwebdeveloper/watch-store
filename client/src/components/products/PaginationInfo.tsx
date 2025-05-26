interface PaginationInfoProps {
  currentPage: number;
  limit: number;
  totalItems: number;
}

const PaginationInfo = ({
  currentPage,
  limit,
  totalItems,
}: PaginationInfoProps) => {
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, totalItems);

  return (
    <div className="pagination-info">
      {`Showing ${start} - ${end} of ${totalItems} items`}
    </div>
  );
};

export default PaginationInfo;
