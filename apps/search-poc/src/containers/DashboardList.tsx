import * as React from 'react';
import DashboardList from '../components/DashboardList';
import { useNexus } from '@bbp/react-nexus';
import { emodelDataQuery, morphologyDataQuery } from '../config';
import { rejects } from 'assert';

const dashboardConfig: { dashboard: DashboardContainer; view: View }[] = [
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
}> = props => {
  // default active dashboard is the first one
  const [activeDashboard, setActiveDashboard] = React.useState<{
    dashboard: DashboardContainer;
    view: View;
  }>(dashboardConfig[0]);

  // call callback prop when dashboard is selected
  React.useEffect(() => {
    props.onDashboardSelected(
      activeDashboard.view.orgLabel,
      activeDashboard.view.projectLabel,
      activeDashboard.view.viewId,
      activeDashboard.dashboard.dataQuery,
    );
  }, [activeDashboard.dashboard['@id']]);

  // format dashboard data for dashboard list component
  const dashboardConfigData = dashboardConfig.map(config => ({
    id: config.dashboard['@id'],
    label: config.dashboard.label,
    description: config.dashboard.description,
  }));

  return (
    <DashboardList
      items={dashboardConfigData}
      onDashboardSelected={id => {
        setActiveDashboard(
          dashboardConfig.find(config => config.dashboard['@id'] === id),
        );
      }}
    />
  );
};

export default DashboardListContainer;
