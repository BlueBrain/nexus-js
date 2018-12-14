import { ElasticSearchViewResponse } from './ElasticSearchView';

// TODO confirm this with SparqlView
export interface WIPDefaultSparqlIndexResponse {
  '@id': string;
  '@type': string | string[];
  _uuid: string;
  _rev: number;
  _deprecated: boolean;
}

export interface ViewsListResponse {
  '@context'?: string | string[];
  _total: number;
  _results: (ElasticSearchViewResponse | WIPDefaultSparqlIndexResponse)[];
}
