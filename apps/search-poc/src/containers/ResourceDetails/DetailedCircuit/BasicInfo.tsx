
import React from 'react';
import { Spin } from 'antd';
import get from 'lodash/get';
import { useNexus } from '@bbp/react-nexus';
import { DEFAULT_SPARQL_VIEW_ID } from '@bbp/nexus-sdk';

import { parseProjectUrl } from '../../../utils';
import { DetailedCircuitResource } from '../types';
import { HandleClickParams } from '../../../types';
import BasicInfo from '../../../components/ResourceDetails/DetailedCircuit/BasicInfo';


// function getBasicInfoQuery(resourceId: string) {
//   return `
//     prefix nxs: <https://neuroshapes.org/>
//     prefix schema: <http://schema.org/>
//     SELECT DISTINCT ?baseCircuitPath
//     WHERE {
//       <${resourceId}> nxs:edgeCollection / nxs:edgePopulation / schema:distribution / schema:url ?baseCircuitPath
//     }
//   `
// }

const BasicInfoContainer: React.FunctionComponent<{
  resource: DetailedCircuitResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  // const query = getBasicInfoQuery(props.resource['@id']);
  // const [org, proj] = parseProjectUrl(props.resource._project);

  // const { data, loading } = useNexus<any>(nexus =>
  //   nexus.View.sparqlQuery(org, proj, DEFAULT_SPARQL_VIEW_ID, query),
  // );

  // const baseCircuitPath = get(data, 'results.bindings[0].baseCircuitPath.value', '');

  // const circuitData = {...props.resource, ...{ baseCircuitPath }};

  return <BasicInfo
    resource={props.resource}
    handleClick={props.handleClick}
  />
}


export default BasicInfoContainer;
