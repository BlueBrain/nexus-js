import { lazy, LazyExoticComponent } from 'react';

const MorphViewer = lazy(() => import('./MorphologyViewer'));
const EModelDetails = lazy(() =>
  import('../../components/ResourceDetails/EModel'),
);
const EModelCollectionDetails = lazy(() => import('./EModelCollection'));
const RecNrnMorphologyCollectionDetails = lazy(() =>
  import('./RecNrnMorphologyCollection'),
);

const detailsComponents: {
  [componentName: string]: LazyExoticComponent<any>;
} = {
  morphViewer: MorphViewer,
  morphCollection: RecNrnMorphologyCollectionDetails,
  emodelDetails: EModelDetails,
  emodelCollectionDetails: EModelCollectionDetails,
};

const compNamesByType: { [componentType: string]: string[] } = {
  ReconstructedNeuronMorphology: ['morphViewer'],
  ReconstructedNeuronMorphologyCollection: ['morphCollection'],
  EModel: ['emodelDetails'],
  EModelCollection: ['emodelCollectionDetails'],
};

// Get matching components by a list of resource types.
// Returns an object with component names as keys and components as their values.
export function getComponentsForTypes(
  resourceTypes: string[],
): {
  [componentName: string]: LazyExoticComponent<any>;
}[] {
  // TODO: FIX
  // @ts-ignore
  return resourceTypes
    .flatMap(type => compNamesByType[type] || [])
    .reduce(
      (comps, name) => ({ ...comps, ...{ [name]: detailsComponents[name] } }),
      {},
    );
}

export { default } from './ResourceDetails';
