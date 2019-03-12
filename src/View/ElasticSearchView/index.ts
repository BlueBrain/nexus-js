import { httpPost } from '../../utils/http';
import { PaginatedList, PaginationSettings } from '../../utils/types';
import Resource from '../../Resource';
import { getElasticSearchView } from '../utils';
import {
  ElasticSearchViewResponse,
  ElasticSearchHit,
  ElasticSearchViewQueryResponse,
  ViewQueryError,
  ElasticSearchResourceResponse,
  ElasticSearchViewAggregationResponse,
} from './types';

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
    this.queryURL = `/views/${this.orgLabel}/${this.projectLabel}/${
      this.id
    }/_search`;
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

  /**
   * Search in a project
   * using an elastic search Query (as a JS Object) as input
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html
   *
   * @param {object} elasticSearchQuery
   * @param {PaginationSettings} [pagination]
   * @returns {Promise<PaginatedList<ElasticSearchHit>>}
   * @memberof ElasticSearchView
   */
  async rawQuery(
    elasticSearchQuery: object,
    pagination?: PaginationSettings,
  ): Promise<PaginatedList<ElasticSearchHit>> {
    try {
      const requestURL = pagination
        ? `${this.queryURL}?from=${pagination.from}&size=${pagination.size}`
        : this.queryURL;

      const response: ElasticSearchViewQueryResponse = await httpPost(
        requestURL,
        elasticSearchQuery,
      );

      const total: number = response.hits.total;
      const index: number = (pagination && pagination.from) || 1;

      // Expand the data for each item in the list
      // By fetching each item by ID
      const results: ElasticSearchHit[] = response.hits.hits;

      return {
        total,
        index,
        results,
      };
    } catch (error) {
      throw new ViewQueryError(error.message);
    }
  }

  /**
   * Search for resources located in a project
   * using an elastic search Query (as a JS Object) as input
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html
   *
   * @param {object} elasticSearchQuery
   * @param {PaginationSettings} [pagination]
   * @returns {Promise<PaginatedList<Resource>>}
   * @memberof ElasticSearchView
   */
  async query(
    elasticSearchQuery: object,
    pagination?: PaginationSettings,
  ): Promise<PaginatedList<Resource>> {
    try {
      const requestURL = pagination
        ? `${this.queryURL}?from=${pagination.from}&size=${pagination.size}`
        : this.queryURL;

      const response: ElasticSearchViewQueryResponse = await httpPost(
        requestURL,
        elasticSearchQuery,
      );

      const total: number = response.hits.total;
      const index: number = (pagination && pagination.from) || 1;

      // Expand the data for each item in the list
      // By fetching each item by ID
      const results: Resource[] = await Promise.all(
        response.hits.hits.map(async resource => {
          return await Resource.getSelf(
            (resource._source as ElasticSearchResourceResponse)['_self'],
          );
        }),
      );

      return {
        total,
        index,
        results,
      };
    } catch (error) {
      throw new ViewQueryError(error.message);
    }
  }

  /**
   * Query aggregations in elastic search
   * using an elastic search Aggregation Query (as a JS Object) as input
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html
   *
   * @param {object} ElasticSearchAggregationQuery
   * @returns {Promise<ElasticSearchViewAggregationResponse>}
   * @memberof ElasticSearchView
   */
  async aggregation(
    elasticSearchAggregationQuery: object,
  ): Promise<ElasticSearchViewAggregationResponse> {
    try {
      // Aggregations don't have pagination, so we simply use the queryURL
      // unlike in the query method
      const requestURL = this.queryURL;

      const response: ElasticSearchViewAggregationResponse = await httpPost(
        requestURL,
        elasticSearchAggregationQuery,
      );
      return response;
    } catch (error) {
      throw new ViewQueryError(error.message);
    }
  }
}
