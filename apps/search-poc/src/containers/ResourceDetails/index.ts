
import React from 'react';


const MorphViewer = React.lazy(() => import('./ReconstructedNeuronMorphology'));

const detailsComponents = {
  morphViewer: MorphViewer,
};

const compNamesByType = {
  ReconstructedNeuronMorphology: ['morphViewer'],
}


// Get matching components by a list of resource types.
// Returns an object with component names as keys and components as their values.
export function getComponentsForTypes(resourceTypes: string[]): {
  [componentName: string]: React.LazyExoticComponent<any>
}[] {
  return resourceTypes
    .flatMap(type => compNamesByType[type] || [])
    .reduce((comps, name) => ({ ...comps, ...{[name]: detailsComponents[name]} }), {});
}

export { default } from './ResourceDetails';
