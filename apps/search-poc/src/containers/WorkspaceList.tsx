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
    description: config.description,
  }));

  const [id, setId] = React.useState<string>(activeId);
  React.useEffect(() => {
    onWorkspaceSelected(id);
  }, [id]);

  return (
    <TabList
      items={configData}
      onSelected={workspaceId => {
        const activeWorkspace = workspaceId
          ? getWorkspaceConfig(workspaceId.toString(), workspaceConfig)
          : workspaceConfig[0];
        setId(activeWorkspace['@id']);
        history.push({
          search: queryString.stringify({
            ...queryString.parse(history.location.search),
            workspace: workspaceId,
          }),
        });
      }}
      defaultActiveId={activeId}
    />
  );
};

export default withRouter(WorkspaceListContainer);
