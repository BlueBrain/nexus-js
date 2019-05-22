import { ElasticSearchView, SparqlView, AggregateSparqlView } from '.';
import { ElasticSearchViewResponse } from './ElasticSearchView/types';
import { SparqlViewResponse } from './SparqlView/types';
import { Context } from '../Resource/types';
import AggregateElasticSearchView from './AggregateElasticSearchView';

export interface ListViewResponse {
  '@context'?: Context;
  _total: number;
  _results: ViewResponse[];
  _next: string;
}

export type Views =
  | ElasticSearchView
  | SparqlView
  | AggregateElasticSearchView
  | AggregateSparqlView;

export type ViewResponse =
  | ElasticSearchViewResponse
  | SparqlViewResponse
  | AggregateViewResponse;

export interface ViewsListResponse {
  '@context'?: string | string[];
  _total: number;
  _results: (ElasticSearchViewResponse | SparqlViewResponse)[];
}

export const DEFAULT_ES_VIEW_ID: string = 'nxv:defaultElasticSearchIndex';
export const DEFAULT_SPARQL_VIEW_ID: string = 'nxv:defaultSparqlIndex';

export enum ViewTypes {
  ElasticSearchView = 'ElasticSearchView',
  AggregateElasticSearchView = 'AggregateElasticSearchView',
  SparqlView = 'SparqlView',
  AggregateSparqlView = 'AggregateSparqlView',
}

export interface SimpleViewResponse {
  '@context'?: Context;
  '@id': string;
  '@type': string[];
  _uuid: string;
  _rev: number;
  _deprecated: boolean;
}

export interface AggregateViewReference {
  project: string;
  viewId: string;
}
export interface AggregateViewResponse extends SimpleViewResponse {
  views: AggregateViewReference[];
}
