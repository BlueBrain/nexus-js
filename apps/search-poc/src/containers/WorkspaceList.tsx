import * as React from 'react';
import queryString from 'query-string';

import TabList from '../components/TabList';
import { HandleClickParams } from '../types';
import history from '../history';


function getWorkspaceConfig(
  id: string,
  configs: WorkspaceConfig[],
): WorkspaceConfig {
  return configs.find(config => config['@id'] === id) || configs[0];
}

type WorkspaceConfig = {
  '@id': string;
  label: string;
  description?: string;
};

const WorkspaceListContainer: React.FunctionComponent<{
  workspaceConfig: WorkspaceConfig[];
  onWorkspaceSelected: (workspaceId: string) => void;
  handleClick: (params: HandleClickParams) => void;
}> = ({ workspaceConfig, onWorkspaceSelected, handleClick }) => {

  // get active id from query string on mount (if any)
  const queryStringWorkspaceId =
    queryString.parse(history.location.search).workspace || '';

  // find out if we have a matching workspace with that id
  const activeId = getWorkspaceConfig(
    queryStringWorkspaceId.toString(),
    workspaceConfig,
  )['@id'];

  // format workspace data for Tablist component
  const configData = workspaceConfig.map(config => ({
    id: config['@id'],
    label: config.label,
    description: config.description || '',
  }));

  // trigger parent on mount with the active id
  React.useEffect(() => {
    onWorkspaceSelected(activeId);
    // eslint-disable-next-line
  }, []);

  return (
    <TabList
      position={'top'}
      items={configData}
      onSelected={workspaceId => {
        const activeWorkspace = workspaceId
          ? getWorkspaceConfig(workspaceId.toString(), workspaceConfig)
          : workspaceConfig[0];
        // we need to remove the active dashboard as we are changing workspaces
        const queryStrings = queryString.parse(history.location.search);
        // eslint-disable-next-line
        const { ['dashboard']: value, ...withoutDashboard } = queryStrings;
        const search = queryString.stringify({
          ...withoutDashboard,
          workspace: workspaceId,
        })

        handleClick({ search, type: 'dashboard' });
        onWorkspaceSelected(activeWorkspace['@id']);
      }}
      defaultActiveId={activeId}
    >
      {children}
    </TabList>
  );
};

export default WorkspaceListContainer;
