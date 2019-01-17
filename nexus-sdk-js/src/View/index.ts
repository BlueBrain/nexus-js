import { getView, listViews } from './utils';

export { default as ElasticSearchView, ElasticSearchViewQueryResponse } from './ElasticSearchView';
export { default as SparqlView, SparqlViewQueryResponse } from './SparqlView';

export default class View {
  static get = getView;
  static list = listViews;
}
