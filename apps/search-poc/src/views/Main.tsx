import * as React from 'react';
import Dashboards from '../containers/DashboardList';
import ResultTable from '../containers/ResultTable';
import { withRouter, History } from 'react-router-dom';
import queryString from 'query-string';

const MainView: React.FunctionComponent<{
  history: History;
}> = ({ history }) => {
  const [data, setData] = React.useState<{
    orgLabel: string;
    projectLabel: string;
    viewId: string;
    dataQuery: string;
  }>(null);

  const activeDashboardId = queryString.parse(history.location.search)
    .dashboard;

  return (
    <>
      <Dashboards
        activeDashboardId={activeDashboardId && activeDashboardId.toString()}
        onDashboardSelected={(
          orgLabel,
          projectLabel,
          viewId,
          dataQuery,
          dashboardId,
        ) => {
          setData({ orgLabel, projectLabel, viewId, dataQuery });
          history.push({ search: `?dashboard=${dashboardId}` });
        }}
      />
      {data && <ResultTable {...data} />}
    </>
  );
};

export default withRouter(MainView);
