import { ElasticSearchViewResponse } from './ElasticSearchView';
import { SparqlViewResponse } from './SparqlView';

export interface ViewsListResponse {
  '@context'?: string | string[];
  _total: number;
  _results: (ElasticSearchViewResponse | SparqlViewResponse)[];
}
