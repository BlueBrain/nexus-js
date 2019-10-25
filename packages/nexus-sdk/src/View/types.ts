import { Resource, PaginatedList, Context } from '../types';

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
export type ViewList = PaginatedList<View>;

export type ElasticSearchExplanation = {
  value: number;
  description: string;
  details: ElasticSearchExplanation[];
};

export type ElasticSearchViewQueryResponse<T> = {
  hits: {
    max_score: number;
    total?: {
      relation: 'eq' | 'gte';
      value: number;
    };
    hits: {
      _score: number;
      _id: string;
      _index: string;
      _source: T;
      _type: string;
      _version?: number;
      _explanation?: ElasticSearchExplanation[];
      fields?: any;
      highlight?: any;
      inner_hits?: any;
      matched_queries?: string[];
      sort?: string[];
    }[];
  };
  timed_out: boolean;
  took: number;
  _shards: {
    failed: number;
    skipped: number;
    successful: number;
    total: number;
  };
  aggregations?: any;
  _scroll_id?: string;
};

export type Binding = {
  [key: string]: {
    type: 'uri' | 'litteral' | 'bnode';
    value: string;
    datatype?: string;
    'xml:lang'?: string;
  };
};

export type SparqlViewQueryResponse = {
  head: {
    vars: string[];
    link?: string[];
  };
  results?: {
    bindings: Binding[];
  };
  boolean?: boolean;
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
