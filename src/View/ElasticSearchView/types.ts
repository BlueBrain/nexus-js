import { ResourceResponseCommon } from '../../Resource/types';

// This is an Elastic Search Mapping
// https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html
export interface Mapping {
  dynamic?: boolean;
  properties: {
    [key: string]: any;
  };
}

// Identifies a view that is part of an AggregateElasticView
export interface ViewsAggregation {
  project: string;
  viewId: string;
}

// When getting a ESView by ID.
export interface ElasticSearchViewResponse {
  '@context'?: string[];
  '@id': string;
  '@type': string[];
  _uuid: string;
  _rev: number;
  _deprecated: boolean;
  _self?: string;
  _constrainedBy?: string;
  _project?: string;
  _createdAt?: string;
  _createdBy?: string;
  _updatedAt?: string;
  _updatedBy?: string;
  includeMetadata?: boolean;
  mapping?: Mapping;
  resourceSchemas?: string[];
  sourceAsText?: boolean;
  views?: ViewsAggregation[];
}

// Original Source is an optional setting from Elastic Search Views configured with
// the 'sourceInText' field set to true, which is the default behavior
export interface ElasticSearchResourceResponse extends ResourceResponseCommon {
  _self: string;
  _original_source?: string;
  [key: string]: any;
}

export interface ElasticSearchHit {
  _score: number;
  _id: string;
  _index: string;
  _source: ElasticSearchResourceResponse;
  _type: string;
}

export class ViewQueryError extends Error {}

// This represents the vanilla Elastic Search response
export interface ElasticSearchViewQueryResponse {
  _shards: {
    failed: number;
    skipped: number;
    successful: number;
    total: number;
  };
  hits: {
    hits: ElasticSearchHit[];
    max_score: number;
    total: number;
  };
  timed_out: boolean;
  took: number;
}

export interface Bucket {
  key: string;
  doc_count: number;
}

export interface ElasticSearchViewAggregationResponse {
  aggregations: {
    [key: string]: {
      doc_count_error_upper_bound: number;
      sum_other_doc_count: number;
      buckets: Bucket[];
    };
  };
}
