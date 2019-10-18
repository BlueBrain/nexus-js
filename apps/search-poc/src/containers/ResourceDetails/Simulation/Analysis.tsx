
import React from 'react';
import { useNexus } from '@bbp/react-nexus';
import { DEFAULT_SPARQL_VIEW_ID } from '@bbp/nexus-sdk';

import { parseProjectUrl } from '../../../utils';
import { mapSparqlResults } from '../../../utils/sparql';
import { SimulationResource } from '../types';
import { HandleClickParams } from '../../../types';
import AnalysisImage from '../../../containers/ResourceDetails/Simulation/AnalysisImage';

function getQuery(id: string) {
  return `
    prefix schema: <http://schema.org/>
    prefix prov: <http://www.w3.org/ns/prov#>

    SELECT ?analysis ?imageUrl
    WHERE {
        ?analysis prov:used <${id}> .
        ?analysis prov:generated / schema:distribution / schema:contentUrl ?imageUrl
    }
  `;
}

const sparqlMapperConfig = {
  mappings: [{
    source: 'imageUrl',
    target: 'imageUrl',
  }],
};


const AnalysisContainer: React.FunctionComponent<{
  resource: SimulationResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const { resource } = props;

  const variableReportId = resource.generated['@id'];

  const query = getQuery(variableReportId);

  const { data, loading, error } = useNexus<any>(nexus => {
    const [org, proj] = parseProjectUrl(resource._project);
    return nexus.View.sparqlQuery(org, proj, DEFAULT_SPARQL_VIEW_ID, query);
  });

  const analysisReports = mapSparqlResults(data, sparqlMapperConfig) as { imageUrl: string }[];

  return (
    <div className="mt">
      <h3>Analysis</h3>
      {analysisReports.map(report =>
        <AnalysisImage
          key={report.imageUrl}
          resource={report}
          handleClick={props.handleClick}
        />
      )}
    </div>
  )
}

export default AnalysisContainer;
