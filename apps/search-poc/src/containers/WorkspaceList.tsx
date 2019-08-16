import * as React from 'react';
import { withRouter, History } from 'react-router-dom';
import queryString from 'query-string';
import TabList from '../components/TabList';

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
  history: History;
}> = ({ workspaceConfig, onWorkspaceSelected, history }) => {
  const queryStringWorkspaceId =
    queryString.parse(history.location.search).workspace || '';
  const activeId = getWorkspaceConfig(
    queryStringWorkspaceId.toString(),
    workspaceConfig,
  )['@id'];

  // format workspace data for Tablist component
  const configData = workspaceConfig.map(config => ({
    id: config['@id'],
    label: config.label,
    description: config.description,
  }));

  console.log(workspaceConfig);
  return (
    <TabList
      items={configData}
      onSelected={workspaceId => {
        const activeWorkspace = workspaceId
          ? getWorkspaceConfig(workspaceId.toString(), workspaceConfig)
          : workspaceConfig[0];
        onWorkspaceSelected(activeWorkspace['@id']);
        history.push({ search: `?workspace=${workspaceId}` });
      }}
      defaultActiveId={activeId}
    />
  );
};

export default withRouter(WorkspaceListContainer);
