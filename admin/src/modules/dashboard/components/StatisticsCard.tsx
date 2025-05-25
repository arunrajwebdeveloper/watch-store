import type { ComponentType } from "react";

type Props = {
  title: string;
  value: number;
  onClick: () => void;
  Component: ComponentType<any>;
};

function StatisticsCard({ title, value, onClick, Component }: Props) {
  return (
    <div className="stat-card" onClick={onClick}>
      <div>
        <div className="mb-2">
          <Component />
        </div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default StatisticsCard;
