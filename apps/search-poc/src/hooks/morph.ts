import * as React from 'react';
import { useNexusContext } from '@bbp/react-nexus';
import { convertToSwc, parseSwc } from '../utils/morph';


export default ({ org, proj, id }: { org: string, proj: string, id: string }) => {
  const nexus = useNexusContext();

  const [morphology, setMorphology] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error|null>(null);

  React.useEffect(() => {
    setLoading(true);

    nexus.File.get(org, proj, encodeURIComponent(id), { as: 'blob' })
      .then(convertToSwc)
      .then(parseSwc)
      .then(setMorphology)
      .catch(setError)
      .finally(() => { setLoading(false) });
  }, [id]);

  return { morphology, loading, error};
};
