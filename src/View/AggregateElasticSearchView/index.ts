import { AggregateViewResponse, AggregateViewReference } from '../types';
import { PaginationSettings } from '../../utils/types';
import { rawQuery, query, aggregation } from '../ElasticSearchView/utils';

export default class AggregateElasticSearchView {
  id: string;
  type: string[];
  uuid: string;
  rev: number;
  deprecated: boolean;
  orgLabel: string;
  projectLabel: string;
  views: AggregateViewReference[];
  queryURL: string;
  constructor(
    orgLabel: string,
    projectLabel: string,
    aggregateViewResponse: AggregateViewResponse,
  ) {
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.id = aggregateViewResponse['@id'];
    this.type = aggregateViewResponse['@type'];
    this.uuid = aggregateViewResponse['_uuid'];
    this.rev = aggregateViewResponse['_rev'];
    this.deprecated = aggregateViewResponse['_deprecated'];
    this.views = aggregateViewResponse.views;
    this.queryURL = `/views/${this.orgLabel}/${
      this.projectLabel
    }/${encodeURIComponent(this.id)}/_search`;
  }

  public async rawQuery(
    elasticSearchQuery: object,
    pagination?: PaginationSettings,
  ) {
    return await rawQuery(this.queryURL)(elasticSearchQuery, pagination);
  }

  public async query(
    elasticSearchQuery: object,
    pagination?: PaginationSettings,
  ) {
    return await query(this.queryURL)(elasticSearchQuery, pagination);
  }

  public async aggregation(elasticSearchAggregationQuery: object) {
    return await aggregation(this.queryURL)(elasticSearchAggregationQuery);
  }
}
