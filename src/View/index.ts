import { getView, listViews } from './utils';

export { default as ElasticSearchView } from './ElasticSearchView';
export { default as SparqlView } from './SparqlView';

const view = {
  get: getView,
  list: listViews,
};

export default view;
