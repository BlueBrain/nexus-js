import store, { setToken, removeToken, setEnvironment } from './store';
import Organization from './Organization';
import Project from './Project';
import Resource from './Resource';
import ElasticSearchView from './views/ElasticSearchView';
import SparqlView from './views/SparqlView';

export default {
  Organization,
  Project,
  Resource,
  ElasticSearchView,
  SparqlView,

  // store update stuff
  store,
  setEnvironment,
  setToken,
  removeToken,

  // top level functions
  listOrganizations(): Promise<Organization[]> {
    return Organization.list();
  },
  getOrganization(name: string): Promise<Organization> {
    return Organization.get(name);
  },
  createOrganization(label: string, name: string): Promise<Organization> {
    return Organization.create(label, name);
  },
};
