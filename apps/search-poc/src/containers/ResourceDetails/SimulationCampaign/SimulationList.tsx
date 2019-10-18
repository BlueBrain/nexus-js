
import React from 'react';
import { Spin, Empty } from 'antd';
import { DEFAULT_SPARQL_VIEW_ID } from '@bbp/nexus-sdk';
import { useNexus } from '@bbp/react-nexus';

import { SimulationCampaignResource, SimulationCampaignSimulation } from '../types';
import { getSimulationCampaignSimulationsQuery } from '../../../config';
import { parseProjectUrl } from '../../../utils';
import { mapSparqlResults } from '../../../utils/sparql';
import { HandleClickParams } from '../../../types';
import SimulationList from '../../../components/ResourceDetails/SimulationCampaign/SimulationList';


const sparqlMapperConf = { mappings: [{
  source: 'job_id',
  target: 'jobId',
}, {
  source: 'name',
  target: 'name',
}, {
  source: 'status',
  target: 'status',
}, {
  source: 'startedAtTime',
  target: 'startedAtTime',
}, {
  source: 'endedAtTime',
  target: 'endedAtTime',
}, {
  source: 'self',
  target: 'self',
}]};

const SimulationListContainer: React.FunctionComponent<{
  resource: SimulationCampaignResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const query = getSimulationCampaignSimulationsQuery(props.resource['@id']);
  const [org, proj] = parseProjectUrl(props.resource._project);

  const { data, loading, error } = useNexus<any>(nexus =>
    nexus.View.sparqlQuery(org, proj, DEFAULT_SPARQL_VIEW_ID, query),
  );

  let simulations: SimulationCampaignSimulation[] = [];
  if (data) {
    simulations = mapSparqlResults(data, sparqlMapperConf) as SimulationCampaignSimulation[];
  }



  return (
    <Spin spinning={loading}>
      {error && !data && <Empty>{error.message}</Empty>}
      {data && (
        <SimulationList
          simulations={simulations}
          handleClick={props.handleClick}
        />
      )}
    </Spin>
  );
};


export default SimulationListContainer;
