import useNexus from './useNexus';

const Get = ({ orgLabel, children }: { orgLabel: string; children: any }) => {
  const state = useNexus(nexus => nexus.Organization.get(orgLabel));
  return children({ ...state });
};

const List = ({ children }: { children: any }) => {
  const state = useNexus(nexus => nexus.Organization.list());
  return children({ ...state });
};

export default {
  Get,
  List,
};
