import { Resource, PaginatedResource, Context } from '../types';

export type SparqlView = Resource & {
  '@id': ['SparqlView', 'View'];
  _uuid: string;
};
export type ElasticSearchView = Resource & {
  '@type': ['ElasticSearchView', 'View'];
  _uuid: string;
  mapping: {};
  sourceAsText?: boolean;
  includeMetadata?: boolean;
  includeDeprecated?: boolean;
  resourceSchemas?: string[];
  resourceTypes?: string[];
};
export type AggregatedElasticSearchView = Resource & {
  '@id': ['AggregatedElasticSearchView', 'View'];
  _uuid: string;
  views: { project: string; viewId: string }[];
};
export type AggregatedSparqlView = Resource & {
  '@id': ['AggregatedSparqlView', 'View'];
  _uuid: string;
  views: { project: string; viewId: string }[];
};

export type View =
  | SparqlView
  | ElasticSearchView
  | AggregatedElasticSearchView
  | AggregatedSparqlView;
export type ViewList = PaginatedResource<View>;

export type ElasticSearchViewQueryResponse = {
  aggregations: {
    schemas: {
      buckets: {
        doc_count: number;
        key: string;
      }[];
      doc_count_error_upper_bound: number;
      sum_other_doc_count: number;
    };
    types: {
      buckets: {
        doc_count: number;
        key: string;
      }[];
      doc_count_error_upper_bound: number;
      sum_other_doc_count: number;
    };
  };
  hits: {
    hits: {
      _score: number;
      _id: string;
      _index: string;
      _source: Resource & {
        _original_source: string;
      };
      _type: string;
    }[];
    max_score: number;
    total: number;
  };
  timed_out: boolean;
  took: number;
  _shards: {
    failed: number;
    skipped: number;
    successful: number;
    total: number;
  };
};

export type ElasticSearchViewPayload = {
  '@id'?: string;
  '@type': ['ElasticSearchView'];
  mapping: {};
  sourceAsText?: boolean;
  includeMetadata?: boolean;
  includeDeprecated?: boolean;
  resourceSchemas?: string | string[];
  resourceTypes?: string | string[];
};

export type AggregatedElasticSearchViewPayload = {
  '@context'?: Context;
  '@id'?: string;
  '@type': ['AggregatedElasticSearchView'];
  views: { project: string; viewId: string }[];
};

export type SparqlViewPayload = {
  '@id'?: string;
  '@type': ['SparqlView'];
  includeMetadata?: boolean;
  includeDeprecated?: boolean;
  resourceSchemas?: string[];
  resourceTypes?: string[];
  resourceTag?: string[];
};

export type AggregatedSparqlViewPayload = {
  '@context'?: Context;
  '@id?': string;
  '@type': ['AggregatedSparqlView'];
  views: { project: string; viewId: string }[];
};

export type ViewPayload =
  | ElasticSearchViewPayload
  | AggregatedElasticSearchViewPayload
  | SparqlViewPayload
  | AggregatedSparqlViewPayload;

export type Statistics = {
  '@context': string;
  delayInSeconds: number;
  discardedEvents: number;
  evaluatedEvents: number;
  lastEventDateTime: string;
  lastProcessedEventDateTime: string;
  processedEvents: number;
  remainingEvents: number;
  totalEvents: number;
};
