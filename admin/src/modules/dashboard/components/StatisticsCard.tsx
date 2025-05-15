type Props = {
  title: string;
  value: number;
  onClick: () => void;
};

function StatisticsCard({ title, value, onClick }: Props) {
  return (
    <div className="stat-card" onClick={onClick}>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default StatisticsCard;
