import * as React from 'react';
import { useNexusContext } from '@bbp/react-nexus';
import { convertToSwc, parseSwc } from '../utils/morph';
// @ts-ignore
import MorphoViewer from 'morphoviewer/es/morphoviewer';

export default (
  {
    org,
    proj,
    id,
  }: {
    org: string;
    proj: string;
    id: string;
  },
  viewEl: React.RefObject<HTMLDivElement>,
) => {
  const nexus = useNexusContext();

  const [morphology, setMorphology] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [stage, setStage] = React.useState<string | undefined>();

  // Download and Parse morphology
  React.useEffect(() => {
    setLoading(true);
    setStage('Loading');
    nexus.File.get(org, proj, encodeURIComponent(id), { as: 'blob' })
      .then((morpho: any) => {
        setStage('Converting');
        return morpho;
      })
      .then(convertToSwc)
      .then((morpho: any) => {
        setStage('Parsing');
        return morpho;
      })
      .then(parseSwc)
      .then(setMorphology)
      .catch(setError)
      .finally(() => {
        setStage(undefined);
        setLoading(false);
      });
  }, [org, proj, id, nexus.File]);

  //  Render Morphology
  React.useEffect(() => {
    let viewer: any;
    if (morphology) {
      try {
        setLoading(true);
        viewer = new MorphoViewer.MorphoViewer(viewEl.current);
        setStage('Building Render');
        viewer.addMorphology(morphology, { asPolyline: true });
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    return () => {
      viewer && viewer.destroy();
    };
  }, [viewEl, morphology]);

  return { morphology, loading, error, stage };
};
