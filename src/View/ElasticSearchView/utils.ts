import {
  PaginationSettings,
  PaginatedList,
  DEFAULT_PAGINATION_SETTINGS,
} from '../../utils/types';
import { Resource } from '../..';
import {
  ElasticSearchHit,
  ElasticSearchViewQueryResponse,
  ElasticSearchResourceResponse,
  ElasticSearchViewAggregationResponse,
} from './types';
import { httpPost } from '../../utils/http';

/**
 * Convenience method to help in filtering a project by what
 * Schema that the resources are conforming to
 *
 * @param {string} constrainedBy
 * @param {PaginationSettings} [pagination]
 * @returns {Promise<PaginatedList<Resource>>}
 * @memberof ElasticSearchView
 */
export const filterByConstrainedBy = (queryURL: string) => async (
  constrainedBy: string,
  pagination?: PaginationSettings,
): Promise<PaginatedList<Resource>> => {
  const queryBody = {
    query: {
      term: { _constrainedBy: constrainedBy },
    },
  };
  return await query(queryURL)(queryBody, pagination);
};

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
export const rawQuery = (queryURL: string) => async (
  elasticSearchQuery: object,
  pagination?: PaginationSettings,
): Promise<PaginatedList<ElasticSearchHit>> => {
  const requestURL = pagination
    ? `${queryURL}?from=${pagination.from}&size=${pagination.size}`
    : queryURL;

  const response: ElasticSearchViewQueryResponse = await httpPost(
    requestURL,
    elasticSearchQuery,
  );

  const total: number = response.hits.total;
  const index: number =
    (pagination && pagination.from) || DEFAULT_PAGINATION_SETTINGS.from;

  // Expand the data for each item in the list
  // By fetching each item by ID
  const results: ElasticSearchHit[] = response.hits.hits;

  return {
    total,
    index,
    results,
  };
};

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
export const query = (queryURL: string) => async (
  elasticSearchQuery: object,
  pagination?: PaginationSettings,
): Promise<PaginatedList<Resource>> => {
  const requestURL = pagination
    ? `${queryURL}?from=${pagination.from}&size=${pagination.size}`
    : queryURL;

  const response: ElasticSearchViewQueryResponse = await httpPost(
    requestURL,
    elasticSearchQuery,
  );

  const total: number = response.hits.total;
  const index: number =
    (pagination && pagination.from) || DEFAULT_PAGINATION_SETTINGS.from;

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
};

/**
 * Query aggregations in elastic search
 * using an elastic search Aggregation Query (as a JS Object) as input
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html
 *
 * @param {object} ElasticSearchAggregationQuery
 * @returns {Promise<ElasticSearchViewAggregationResponse>}
 * @memberof ElasticSearchView
 */
export const aggregation = (queryURL: string) => async (
  elasticSearchAggregationQuery: object,
): Promise<ElasticSearchViewAggregationResponse> => {
  // Aggregations don't have pagination, so we simply use the queryURL
  // unlike in the query method

  const response: ElasticSearchViewAggregationResponse = await httpPost(
    queryURL,
    elasticSearchAggregationQuery,
  );
  return response;
};
