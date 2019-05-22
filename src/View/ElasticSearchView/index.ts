import { PaginatedList, PaginationSettings } from '../../utils/types';
import Resource from '../../Resource';
import { getElasticSearchView } from '../utils';
import { ElasticSearchViewResponse } from './types';
import Statistics from '../../Statistics';
import { getViewStatistics } from '../../Statistics/utils';
import { query, rawQuery, aggregation } from './utils';

export default class ElasticSearchView {
  id: string;
  type: string[];
  uuid: string;
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
    this.rev = elasticSearchViewResponse['_rev'];
    this.deprecated = elasticSearchViewResponse['_deprecated'];
    this.queryURL = `/views/${this.orgLabel}/${
      this.projectLabel
    }/${encodeURIComponent(this.id)}/_search`;
  }

  static get = getElasticSearchView;

  /**
   * Convenience method to help in filtering a project by @Types
   *
   * @param {string[]} types
   * @param {PaginationSettings} [pagination]
   * @returns {Promise<PaginatedList<Resource>>}
   * @memberof ElasticSearchView
   */
  async filterByTypes(
    types: string[],
    pagination?: PaginationSettings,
  ): Promise<PaginatedList<Resource>> {
    const query = {
      query: {
        bool: {
          filter: types.map(type => ({ term: { '@type': type } })),
        },
      },
    };
    return await this.query(query, pagination);
  }

  /**
   * Convenience method to help in filtering a project by what
   * Schema that the resources are conforming to
   *
   * @param {string} constrainedBy
   * @param {PaginationSettings} [pagination]
   * @returns {Promise<PaginatedList<Resource>>}
   * @memberof ElasticSearchView
   */
  async filterByConstrainedBy(
    constrainedBy: string,
    pagination?: PaginationSettings,
  ): Promise<PaginatedList<Resource>> {
    const query = {
      query: {
        term: { _constrainedBy: constrainedBy },
      },
    };
    return await this.query(query, pagination);
  }

  public async getStatistics(): Promise<Statistics> {
    return getViewStatistics(this.orgLabel, this.projectLabel, this.id);
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
