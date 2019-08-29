import * as React from 'react';
import { withRouter, History } from 'react-router-dom';
import { Spin, Alert } from 'antd';
import Dashboards from '../containers/DashboardList';
import ResultTable from '../containers/ResultTable';
import useStudioConfig from '../hooks/useStudioConfig';
import WorkspaceList from '../containers/WorkspaceList';
import './MainView.css';
import TabList from '../components/TabList';

const MainView: React.FunctionComponent<{
  studioOrg: string;
  studioProject: string;
  studioViewId: string;
  studioQuery: string;
  history: History;
}> = ({ studioOrg, studioProject, studioViewId, studioQuery, history }) => {
  const [activeWorkspaceId, setActiveWorkspaceId] = React.useState<string>(
    null,
  );

  const [resultTableData, setResultTableData] = React.useState<{
    orgLabel: string;
    projectLabel: string;
    viewId: string;
    dataQuery: string;
  }>(null);

  // fetch studio data
  const { loading, data: studioData, error } = useStudioConfig(
    studioOrg,
    studioProject,
    studioViewId,
    studioQuery,
  );

  if (loading) {
    return <Spin></Spin>;
  }

  if (error) {
    console.error(error);
    return (
      <Alert
        message="Error loading studio"
        description={'There was an error loading the Studio configuration'}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="main-view">
      <WorkspaceList
        workspaceConfig={studioData.workspaces}
        onWorkspaceSelected={setActiveWorkspaceId}
      >
        {props => <TabList {...props} />}
      </WorkspaceList>
      {activeWorkspaceId && (
        <Dashboards
          workspaceId={activeWorkspaceId}
          dashboardConfig={
            (
              studioData.workspaces.find(w => w['@id'] === activeWorkspaceId) ||
              studioData.workspaces[0]
            ).dashboards
          }
          onDashboardSelected={(orgLabel, projectLabel, viewId, dataQuery) => {
            setResultTableData({ orgLabel, projectLabel, viewId, dataQuery });
          }}
        />
      )}
      {resultTableData && (
        <ResultTable
          {...resultTableData}
          handleRowClick={(index, items) => {
            history.push(`/resources/?self=${items[index].self}`);
          }}
        />
      )}
    </div>
  );
};

export default withRouter(MainView);
