import * as React from 'react';

export type DashboardItem = {
  id: string;
  label: string;
};

const DashboardList: React.FunctionComponent<{
  items: DashboardItem[];
  onDashboardSelected: (id: string) => void;
  activeDashboardId?: string;
}> = ({ items, onDashboardSelected, activeDashboardId }) => {
  return (
    <ul className="Dashboard-list">
      {items.map(item => {
        const classes = item.id === activeDashboardId ? 'active' : '';
        return (
          <li
            className={classes + ' item'}
            key={item.id}
            onClick={() => onDashboardSelected(item.id)}
          >
            {item.label}
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardList;
