import * as React from 'react';
import { useNexusContext } from '@bbp/react-nexus';

export default (selfUrl:string) => {
  const nexus = useNexusContext();

  const [entity, setEntity] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error|null>(null);

  React.useEffect(() => {
    setLoading(true);
    nexus.httpGet({ path: decodeURIComponent(selfUrl) })
      .then(setEntity)
      .catch(setError)
      .finally(() => { setLoading(false) });
  }, [nexus, selfUrl]);

  return { entity, loading, error};
};
