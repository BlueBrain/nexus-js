import jsonld from 'jsonld';
import { useNexus } from '@bbp/react-nexus';
import { makeNQuad } from '../utils/sparql';
import { studioFrame } from '../config';
import { parseNexusUrl } from '../utils';

export type Dashboard = {
  '@id': string;
  dataQuery: string;
  label: string;
};

export type DashboardViewData = {
  '@id': string;
  deployment: string;
  entityType: string;
  id?: string;
  org: string;
  project: string;
  schema?: string;
};

export type DashboardViewPair = {
  dashboard: Dashboard;
  view: DashboardViewData;
};

export type Workspace = {
  '@id': string;
  '@type': 'StudioWorkspace';
  label?: string;
  description?: string;
  dashboards: {
    dashboard: string;
    view: string;
  }[];
};

export type WorkspaceData = {
  '@id': string;
  description: string;
  label: string;
  dashboards: DashboardViewPair[];
};

export type StudioData = {
  '@id': string;
  label: string;
  workspaces: WorkspaceData[];
};

export type Frame = {
  '@graph': any[];
};

export default (
  orgLabel: string,
  projectLabel: string,
  viewId: string,
  dataQuery: string,
) => {
  // fetch studio data
  const { loading, data, error } = useNexus<StudioData>(
    nexus =>
      nexus.View.sparqlQuery(orgLabel, projectLabel, viewId, dataQuery)
        .then(response =>
          jsonld.fromRDF(makeNQuad(response), {
            format: 'application/n-quads',
          }),
        )
        .then(json => jsonld.frame(json, studioFrame, { embed: '@always' }))
        .then(frame => (frame as Frame)['@graph'][0])
        .then(json => ({
          ...json,
          workspaces: json.workspaces.map((w: Workspace) => ({
            ...w,
            dashboards: w.dashboards.map((d: any) => ({
              ...d,
              view: {
                ...d.view,
                // the only reason we're doing all of this it to extract the org/project labels
                // out of the view id
                ...parseNexusUrl(d.view.project['@id']),
              },
            })),
          })),
        })),
    [dataQuery],
  );

  return {
    loading,
    data,
    error,
  };
};
