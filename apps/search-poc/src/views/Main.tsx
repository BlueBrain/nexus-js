import * as React from 'react';
import Dashboards from '../containers/DashboardList';
import ResultTable from '../containers/ResultTable';

const MainView: React.FunctionComponent = () => {
  const [data, setData] = React.useState<{
    orgLabel: string;
    projectLabel: string;
    viewId: string;
    dataQuery: string;
  }>(null);

  return (
    <>
      <Dashboards
        onDashboardSelected={(orgLabel, projectLabel, viewId, dataQuery) => {
          setData({ orgLabel, projectLabel, viewId, dataQuery });
        }}
      />
      {data && <ResultTable {...data} />}
    </>
  );
};

export default MainView;
