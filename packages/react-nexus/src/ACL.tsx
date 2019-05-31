import useNexus from './useNexus';

const List = ({ path, children }: { path: string; children: any }) => {
  const state = useNexus(nexus => nexus.ACL.list(path));
  return children({ ...state });
};

export default {
  List,
};
