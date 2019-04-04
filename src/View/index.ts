import { getView, listViews } from './utils';

export { default as ElasticSearchView } from './ElasticSearchView';
export { default as SparqlView } from './SparqlView';

const View = {
  get: getView,
  list: listViews,
};

export default View;
