import * as React from 'react';
import DashboardList from '../components/DashboardList';
import { emodelDataQuery, morphologyDataQuery } from '../config';
import { withRouter, History } from 'react-router-dom';
import queryString from 'query-string';

// TODO: get that config from Nexus
const dashboardConfig: DashboardConfig[] = [
  {
    dashboard: {
      '@id': 'http://bbp.ch/emodels',
      '@type': 'nxv:StudioDashboard',
      label: 'E-models Collection',
      description: 'Emodels curation dashboard',
      dataQuery: emodelDataQuery,
    },
    view: {
      orgLabel: 'bbp',
      projectLabel: 'studio',
      viewId: 'nxv:bbpStudioView',
    },
  },
  {
    dashboard: {
      '@id': 'http://bbp.ch/morphy',
      '@type': 'nxv:StudioDashboard',
      label: 'Morphologies collections',
      description: 'Morpho curation dashboard',
      dataQuery: morphologyDataQuery,
    },
    view: {
      orgLabel: 'bbp',
      projectLabel: 'studio',
      viewId: 'nxv:bbpStudioView',
    },
  },
];

function getDashBoardConfig(
  id: string,
  configs: DashboardConfig[],
): DashboardConfig {
  return configs.find(config => config.dashboard['@id'] === id);
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
  orgLabel: string;
  projectLabel: string;
  viewId: string;
};

const DashboardListContainer: React.FunctionComponent<{
  onDashboardSelected: (
    orgLabel: string,
    projectLabel: string,
    viewId: string,
    dataQuery: string,
  ) => void;
  history: History;
}> = ({ onDashboardSelected, history }) => {
  const activeDashboardId = queryString.parse(history.location.search)
    .dashboard;

  // format dashboard data for dashboard list component
  const dashboardConfigData = dashboardConfig.map(config => ({
    id: config.dashboard['@id'],
    label: config.dashboard.label,
    description: config.dashboard.description,
  }));

  return (
    <DashboardList
      items={dashboardConfigData}
      onDashboardSelected={dashboardId => {
        const activeDashboard = dashboardId
          ? getDashBoardConfig(dashboardId.toString(), dashboardConfig)
          : dashboardConfig[0];
        onDashboardSelected(
          activeDashboard.view.orgLabel,
          activeDashboard.view.projectLabel,
          activeDashboard.view.viewId,
          activeDashboard.dashboard.dataQuery,
        );
        history.push({ search: `?dashboard=${dashboardId}` });
      }}
      activeDashboardId={activeDashboardId && activeDashboardId.toString()}
    />
  );
};

export default withRouter(DashboardListContainer);
