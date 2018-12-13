import { httpPost } from '../../utils/http';
import { PaginatedList, PaginationSettings } from '../../utils/types';
import Resource from '../../Resource';

export interface Mapping {
  dynamic?: boolean;
  properties: {
    [key: string]: any;
  };
}

export interface ElasticSearchViewResponse {
  '@id': string;
  '@type': string[];
  _uuid: string;
  includeMetadata: boolean;
  mapping: Mapping;
  sourceAsText: boolean;
  _rev: number;
  _deprecated: boolean;
}

class ElasticSeachView {
  id: string;
  type: string[];
  uuid: string;
  includeMetadata: boolean;
  mapping: Mapping;
  sourceAsText: boolean;
  rev: number;
  deprecated: boolean;
  orgLabel: string;
  projectLabel: string;
  queryURL: string;
  constructor(
    orgLabel: string,
    projectLabel: string,
    elasticSearchViewResponse: ElasticSearchViewResponse,
  ) {
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.id = elasticSearchViewResponse['@id'];
    this.type = elasticSearchViewResponse['@type'];
    this.uuid = elasticSearchViewResponse['_uuid'];
    this.includeMetadata = elasticSearchViewResponse['includeMetadata'];
    this.mapping = elasticSearchViewResponse['mapping'];
    this.sourceAsText = elasticSearchViewResponse['sourceAsText'];
    this.rev = elasticSearchViewResponse['_rev'];
    this.deprecated = elasticSearchViewResponse['_deprecated'];
    this.queryURL = `views/${this.orgLabel}/${this.projectLabel}/${
      this.id
    }/_search`;
  }

  async query(
    elasticSearchQuery: Object,
    pagination?: PaginationSettings,
  ): Promise<PaginatedList<Resource>> {
    const requestURL = pagination
      ? `${this.queryURL}?from=${pagination.from}&size=${pagination.size}`
      : this.queryURL;
    const response = await httpPost(requestURL, elasticSearchQuery);
    return response;
  }
}

export default ElasticSeachView;
