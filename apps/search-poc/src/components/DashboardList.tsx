import * as React from 'react';

export type DashboardItem = {
  id: string;
  label: string;
};

const DashboardList: React.FunctionComponent<{
  items: DashboardItem[];
  onDashboardSelected: (id: string) => void;
}> = props => {
  const [activeDashboardId, setActiveDashboardId] = React.useState<string>(
    props.items[0].id,
  );

  React.useEffect(() => {
    if (activeDashboardId !== null) {
      props.onDashboardSelected(activeDashboardId);
    }
  }, [activeDashboardId]);

  return (
    <ul className="Dashboard-list">
      {props.items.map(item => {
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
