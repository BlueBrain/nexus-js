import useNexus from './useNexus';
import { ProjectList, ProjectListOptions, Project } from '@bbp/nexus-sdk';

const Get = ({
  orgLabel,
  projectLabel,
  children,
}: {
  orgLabel: string;
  projectLabel: string;
  children: any;
}) => {
  const state = useNexus<Project>(nexus =>
    nexus.Project.get(orgLabel, projectLabel),
  );
  return children({ ...state });
};

const List = ({
  orgLabel,
  options,
  children,
}: {
  orgLabel: string;
  options?: ProjectListOptions;
  children: any;
}) => {
  const state = useNexus<ProjectList>(
    nexus => nexus.Project.list(orgLabel, options),
    [options && options.label],
  );
  return children({ ...state });
};

export default {
  Get,
  List,
};
