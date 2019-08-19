import * as React from 'react';
import { withRouter, History } from 'react-router-dom';
import queryString from 'query-string';
import TabList from '../components/TabList';

function getDashBoardConfig(
  id: string,
  configs: DashboardConfig[],
): DashboardConfig {
  return configs.find(config => config.dashboard['@id'] === id) || configs[0];
}

type DashboardConfig = { dashboard: DashboardContainer; view: View };

type DashboardContainer = {
  '@id': string;
  '@type': string;
  label: string;
  description?: string;
  dataQuery: string;
};

type View = {
  '@id': string;
  org: string;
  project: string;
};

const DashboardListContainer: React.FunctionComponent<{
  dashboardConfig: DashboardConfig[];
  onDashboardSelected: (
    orgLabel: string,
    projectLabel: string,
    viewId: string,
    dataQuery: string,
  ) => void;
  history: History;
}> = ({ dashboardConfig, onDashboardSelected, history }) => {
  const queryStringDashboardId =
    queryString.parse(history.location.search).dashboard || '';

  // format dashboard data for TabList component
  const dashboardConfigData = dashboardConfig.map(config => ({
    id: config.dashboard['@id'],
    label: config.dashboard.label,
    description: config.dashboard.description,
  }));

  const [activeDashboard, setActiveDashboard] = React.useState<DashboardConfig>(
    getDashBoardConfig(queryStringDashboardId.toString(), dashboardConfig),
  );
  console.log('dashy', activeDashboard, dashboardConfig);
  React.useEffect(() => {
    const db = getDashBoardConfig(
      queryStringDashboardId.toString(),
      dashboardConfig,
    );
    onDashboardSelected(
      db.view.org,
      db.view.project,
      db.view['@id'],
      db.dashboard.dataQuery,
    );
    setActiveDashboard(db);
  }, [dashboardConfig, queryStringDashboardId]); // watch any config changes

  return (
    <TabList
      items={dashboardConfigData}
      onSelected={dashboardId => {
        const activeDashboard = dashboardId
          ? getDashBoardConfig(dashboardId.toString(), dashboardConfig)
          : dashboardConfig[0];
        console.log('on select', activeDashboard);
        setActiveDashboard(activeDashboard);
        history.push({
          search: queryString.stringify({
            ...queryString.parse(history.location.search),
            dashboard: dashboardId,
          }),
        });
      }}
      defaultActiveId={activeDashboard.dashboard['@id']}
    />
  );
};

export default withRouter(DashboardListContainer);
