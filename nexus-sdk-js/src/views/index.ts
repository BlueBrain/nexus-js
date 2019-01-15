import { ElasticSearchViewResponse } from './ElasticSearchView';
import { SparqlViewResponse } from './SparqlView';

export type ViewResponse = ElasticSearchViewResponse | SparqlViewResponse;

export interface ViewsListResponse {
  '@context'?: string | string[];
  _total: number;
  _results: (ElasticSearchViewResponse | SparqlViewResponse)[];
}
