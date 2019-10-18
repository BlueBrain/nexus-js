
import React from 'react';
import get from 'lodash/get';
import { Spin, Empty } from 'antd';
import { useNexus } from '@bbp/react-nexus';
import { DEFAULT_SPARQL_VIEW_ID } from '@bbp/nexus-sdk';

import { parseProjectUrl } from '../../../utils';
import { DetailedCircuitResource } from '../types';
import { HandleClickParams } from '../../../types';
import DetailedCircuit from '../../../components/ResourceDetails/SimulationCampaign/DetailedCircuit';


function getBasicInfoQuery(resourceId: string) {
  return `
    prefix nxs: <https://neuroshapes.org/>
    prefix schema: <http://schema.org/>
    SELECT DISTINCT ?baseCircuitPath
    WHERE {
      <${resourceId}> nxs:edgeCollection / nxs:edgePopulation / schema:distribution / schema:url ?baseCircuitPath
    }
  `
}

const DetailedCircuitContainer: React.FunctionComponent<{
  resourceId: string;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const query = getBasicInfoQuery(props.resourceId);

  const { data, loading, error } = useNexus<any>(nexus => {
    const addBasicInfo = (resource: DetailedCircuitResource) => {
      const [org, proj] = parseProjectUrl(resource._project);
      return nexus.View
        .sparqlQuery(org, proj, DEFAULT_SPARQL_VIEW_ID, query)
        .then((basicInfo) => {
          const baseCircuitPath = get(basicInfo, 'results.bindings[0].baseCircuitPath.value', '') as string;
          return {...resource, ...{ baseCircuitPath }};
        });
    }

    return nexus.httpGet({ path: props.resourceId }).then(addBasicInfo);
  });

  return (
    <Spin spinning={loading}>
      {error && !data && <Empty>{error.message}</Empty>}
      {data && (
        <DetailedCircuit
          resource={data}
          handleClick={props.handleClick}
        />
      )}
    </Spin>
  );
};


export default DetailedCircuitContainer;
