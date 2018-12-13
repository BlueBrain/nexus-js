export class InvalidESViewPayloadError extends Error {}

export interface ElasticSearchViewResponse {
  '@id': string;
  '@type': string[];
  _uuid: string;
  includeMetadata: boolean;
  mapping: {
    dynamic?: boolean;
    properties: {
      [key: string]: any;
    };
  };
  sourceAsText: boolean;
  _rev: number;
  _deprecated: boolean;
}

class ElasticSeachView {
  constructor(elasticSearchViewResponse: ElasticSearchViewResponse) {}
}

export default ElasticSeachView;
