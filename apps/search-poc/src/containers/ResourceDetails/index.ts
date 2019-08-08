
import React from 'react';


const MorphViewer = React.lazy(() => import('./ReconstructedNeuronMorphology'));

const compByName = {
  morphViewer: MorphViewer,
};

const compNamesByType = {
  ReconstructedNeuronMorphology: ['morphViewer'],
}


export function getComponentsByTypeList(resourceTypes: string[]): {
  name: string;
  Component: React.LazyExoticComponent<any>,
}[] {
  const compNames = resourceTypes.reduce((compNames, type) => {
    const currTypeComps = compNamesByType[type];
    return currTypeComps ? compNames.concat(currTypeComps) : compNames;
  }, []);

  const uniqCompNames = Array.from(new Set(compNames));
  return uniqCompNames.map(name => ({ name, Component: compByName[name] }));
}

export { default } from './ResourceDetails';
