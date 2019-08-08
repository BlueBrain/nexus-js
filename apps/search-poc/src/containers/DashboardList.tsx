import * as React from 'react';
import { withRouter, History } from 'react-router-dom';
import queryString from 'query-string';
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
  ) => void;
  history: History;
}> = ({ onDashboardSelected, history }) => {
  // they might be an active dashboard id setup as a query string
  const defaultActiveDashboardId = queryString.parse(history.location.search)
    .dashboard;

  // default active dashboard is the first one if none is present in querystring
  const [activeDashboard, setActiveDashboard] = React.useState<{
    dashboard: DashboardContainer;
    view: View;
  }>(
    defaultActiveDashboardId
      ? getDashBoardConfig(defaultActiveDashboardId.toString(), dashboardConfig)
      : dashboardConfig[0],
  );

  // call callback prop when dashboard is selected
  React.useEffect(() => {
    onDashboardSelected(
      activeDashboard.view.orgLabel,
      activeDashboard.view.projectLabel,
      activeDashboard.view.viewId,
      activeDashboard.dashboard.dataQuery,
    );
  }, [activeDashboard, onDashboardSelected]);

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
        setActiveDashboard(getDashBoardConfig(id, dashboardConfig));
        history.push({ search: `?dashboard=${id}` });
      }}
      defaultActiveId={activeDashboard.dashboard['@id']}
    />
  );
};

export default withRouter(DashboardListContainer);
