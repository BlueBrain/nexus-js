import { ElasticSearchView, SparqlView } from '.';
import { ElasticSearchViewResponse } from './ElasticSearchView/types';
import { SparqlViewResponse } from './SparqlView/types';
import { Context, ResourceResponseCommon } from '../Resource/types';
import AggregateElasticSearchView from './AggregateElasticSearchView';
import AggregateSparqlView from './AggregateSparqlView';

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

export interface ViewResponseCommon extends ResourceResponseCommon {
  _uuid: string;
}

export interface AggregateViewReference {
  project: string;
  viewId: string;
}
export interface AggregateViewResponse extends ViewResponseCommon {
  views: AggregateViewReference[];
}
