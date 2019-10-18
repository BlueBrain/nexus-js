import * as React from 'react';
import queryString from 'query-string';

import TabList from '../components/TabList';
import { HandleClickParams } from '../types';


function getDashBoardConfig(
  id: string,
  workspaceId: string,
  configs: DashboardConfig[],
): DashboardConfig {
  return (
    configs.find(config => id === `${config.dashboard['@id']}_${workspaceId}`) ||
    configs[0]
  );
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
  workspaceId: string;
  dashboardConfig: DashboardConfig[];
  onDashboardSelected: (
    orgLabel: string,
    projectLabel: string,
    viewId: string,
    dataQuery: string,
  ) => void;
  handleClick: (params: HandleClickParams) => void,
  query: string,
}> = ({ workspaceId, dashboardConfig, onDashboardSelected, handleClick, query }) => {
  // get active id from query string on mount (if any)
  const queryStringDashboardId =
    queryString.parse(query).dashboard || '';

  // find out if we have a matching dashboard config with that id
  const activeDb = getDashBoardConfig(
    queryStringDashboardId.toString(),
    workspaceId,
    dashboardConfig,
  );

  // format dashboard data for TabList component
  const dashboardConfigData = dashboardConfig.map(config => ({
    id: `${config.dashboard['@id']}_${workspaceId}`,
    label: config.dashboard.label,
    description: config.dashboard.description || '',
  }));

  // trigger parent on mount with the active id
  React.useEffect(() => {
    onDashboardSelected(
      activeDb.view.org,
      activeDb.view.project,
      activeDb.view['@id'],
      activeDb.dashboard.dataQuery,
    );
    // eslint-disable-next-line
  }, [dashboardConfig]); // watch config and trigger callback parent when it changes

  return (
    <TabList
      items={dashboardConfigData}
      onSelected={dashboardId => {
        const activeDashboard = getDashBoardConfig(
          dashboardId,
          workspaceId,
          dashboardConfig,
        );
        onDashboardSelected(
          activeDashboard.view.org,
          activeDashboard.view.project,
          activeDashboard.view['@id'],
          activeDashboard.dashboard.dataQuery,
        );
        const search = queryString.stringify({
          ...queryString.parse(query),
          dashboard: dashboardId,
        })
        handleClick({ search, type: 'dashboard' });
      }}
      defaultActiveId={`${activeDb.dashboard['@id']}_${workspaceId}`}
    />
  );
};


export default DashboardListContainer;
