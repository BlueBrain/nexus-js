
import { lazy, LazyExoticComponent } from 'react';


const MorphViewer = lazy(() => import('./ReconstructedNeuronMorphology'));
const EModelDetails = lazy(() => import('../../components/ResourceDetails/EModel'));

const detailsComponents = {
  morphViewer: MorphViewer,
  emodelDetails: EModelDetails,
};

const compNamesByType = {
  ReconstructedNeuronMorphology: ['morphViewer'],
  EModel: ['emodelDetails'],
}


// Get matching components by a list of resource types.
// Returns an object with component names as keys and components as their values.
export function getComponentsForTypes(resourceTypes: string[]): {
  [componentName: string]: LazyExoticComponent<any>
}[] {
  return resourceTypes
    .flatMap(type => compNamesByType[type] || [])
    .reduce((comps, name) => ({ ...comps, ...{[name]: detailsComponents[name]} }), {});
}

export { default } from './ResourceDetails';
