import { getView, listViews } from './utils';

export { default as ElasticSearchView } from './ElasticSearchView';
export { default as SparqlView } from './SparqlView';

export default class View {
  static get = getView;
  static list = listViews;
}
