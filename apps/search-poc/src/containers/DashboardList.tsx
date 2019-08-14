import * as React from 'react';
import DashboardList from '../components/DashboardList';
import { emodelDataQuery, morphologyDataQuery } from '../config';

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
    dashboardId: string,
  ) => void;
  activeDashboardId?: string;
}> = ({ onDashboardSelected, activeDashboardId }) => {
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
          dashboardId,
        );
      }}
      activeDashboardId={activeDashboardId}
    />
  );
};

export default DashboardListContainer;
