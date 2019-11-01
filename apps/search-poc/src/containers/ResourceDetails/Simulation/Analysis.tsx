
import React from 'react';
import { Col, Row } from 'antd';
import { useNexus } from '@bbp/react-nexus';
import { DEFAULT_SPARQL_VIEW_ID } from '@bbp/nexus-sdk';

import { parseProjectUrl } from '../../../utils';
import { mapSparqlResults } from '../../../utils/sparql';
import { SimulationResource } from '../types';
import { HandleClickParams } from '../../../types';
import AnalysisImage from '../../../containers/ResourceDetails/Simulation/AnalysisImage';
import './Analysis.css';


function getQuery(id: string) {
  return `
    prefix schema: <http://schema.org/>
    prefix prov: <http://www.w3.org/ns/prov#>

    SELECT ?analysis ?imageUrl ?name ?description
    WHERE {
        ?analysis prov:used <${id}> ;
        prov:generated / schema:distribution / schema:contentUrl ?imageUrl ;
        prov:generated / schema:name ?name ;
        prov:generated / schema:description ?description
    }
  `;
}

const sparqlMapperConfig = {
  mappings: [{
    source: 'imageUrl',
    target: 'imageUrl',
  }, {
    source: 'name',
    target: 'name',
  }, {
    source: 'description',
    target: 'description',
  }],
};

type AnalysisReport = {
  name: string;
  description: string;
  imageUrl: string;
}


const AnalysisContainer: React.FunctionComponent<{
  resource: SimulationResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {
  const { resource } = props;

  const variableReportId = resource.generated['@id'];

  const query = getQuery(variableReportId);

  const { data } = useNexus<any>(nexus => {
    const [org, proj] = parseProjectUrl(resource._project);
    return nexus.View.sparqlQuery(org, proj, DEFAULT_SPARQL_VIEW_ID, query);
  });

  const analysisReports = mapSparqlResults(data, sparqlMapperConfig) as AnalysisReport[];

  return (
    <div className="mt">
      <h3>Analysis</h3>
      <Row gutter={16}>
        {analysisReports.map(report =>
          <Col
            span={8}
            className="analysis-image-column"
            key={report.imageUrl}
          >
            <h4>{report.name}</h4>
            <p>{report.description}</p>
            <AnalysisImage
              resource={report}
              handleClick={props.handleClick}
            />
          </Col>
        )}
      </Row>
    </div>
  )
}

export default AnalysisContainer;
