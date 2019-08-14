import * as React from 'react';

export type DashboardItem = {
  id: string;
  label: string;
};

const DashboardList: React.FunctionComponent<{
  items: DashboardItem[];
  onDashboardSelected: (id: string) => void;
  defaultActiveId?: string;
}> = ({ items, onDashboardSelected, defaultActiveId }) => {
  const [activeDashboardId, setActiveDashboardId] = React.useState<string>(
    defaultActiveId || items[0].id,
  );

  React.useEffect(() => {
    if (activeDashboardId !== null) {
      onDashboardSelected(activeDashboardId);
    }
  }, [JSON.stringify({ activeDashboardId, onDashboardSelected })]);

  return (
    <ul className="Dashboard-list">
      {items.map(item => {
        const classes = item.id === activeDashboardId ? 'active' : '';
        return (
          <li
            className={classes + ' item'}
            key={item.id}
            onClick={() => setActiveDashboardId(item.id)}
          >
            {item.label}
          </li>
        );
      })}
    </ul>
  );
};

export default DashboardList;
