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
  const [data, setData] = React.useState<{
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
    return (
      <Alert
        message="Error loading studio"
        description={
          'There was an error loading the Studio configuration: ' +
            error.message || error
        }
        type="error"
        showIcon
      />
    );
  }
  console.log(studioData);
  return (
    <div className="main-view">
      <WorkspaceList
        workspaceConfig={studioData.workspaces}
        onWorkspaceSelected={workspaceId => {
          console.log('selected', workspaceId);
        }}
      />
      <Dashboards
        dashboardConfig={studioData.workspaces[0].dashboards}
        onDashboardSelected={(orgLabel, projectLabel, viewId, dataQuery) => {
          setData({ orgLabel, projectLabel, viewId, dataQuery });
        }}
      />
      {data && <ResultTable {...data} />}
    </div>
  );
};

export default MainView;
