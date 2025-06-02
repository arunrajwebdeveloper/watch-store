import "./style.skeleton.css";

function TableSkeleton() {
  return (
    <div className="skeleton table">
      {Array.from({ length: 5 }, (_, i) => i)?.map((skeleton: any) => {
        return (
          <div className="skeleton__row" key={skeleton}>
            <div className="skeleton__column"></div>
          </div>
        );
      })}
    </div>
  );
}

export default TableSkeleton;
