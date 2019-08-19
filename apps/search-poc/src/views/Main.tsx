import * as React from 'react';
import Dashboards from '../containers/DashboardList';
import ResultTable from '../containers/ResultTable';
import { useNexus } from '@bbp/react-nexus';
import { Spin, Alert } from 'antd';
import jsonld from 'jsonld';
import { SparqlQueryResults, makeNQuad } from '../utils/sparql';
import { studioFrame } from '../config';
import { getOrgAndProjectLabel } from '../utils';
import WorkspaceList from '../containers/WorkspaceList';

const MainView: React.FunctionComponent<{
  studioOrg: string;
  studioProject: string;
  studioViewId: string;
  studioQuery: string;
}> = props => {
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
  const { loading, data: studioData, error } = useNexus<SparqlQueryResults>(
    nexus =>
      nexus.View.sparqlQuery(
        props.studioOrg,
        props.studioProject,
        props.studioViewId,
        props.studioQuery,
      )
        .then(response => jsonld.fromRDF(makeNQuad(response), studioData))
        .then(json => jsonld.frame(json, studioFrame, { embed: '@always' }))
        .then(frame => frame['@graph'][0])
        .then(json => ({
          ...json,
          workspaces: json.workspaces.map(w => ({
            ...w,
            dashboards: w.dashboards.map(d => ({
              ...d,
              view: {
                ...d.view,
                // the only reason we're doing all of this it to extract the org/project labels
                // out of the view id
                ...getOrgAndProjectLabel(d.view.project['@id']),
              },
            })),
          })),
        })),
    [props.studioQuery],
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
      />
      {activeWorkspaceId && (
        <Dashboards
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
      {resultTableData && <ResultTable {...resultTableData} />}
    </div>
  );
};

export default MainView;
