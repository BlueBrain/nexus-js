import { httpGet, httpPut } from './utils/http';
import Store from './utils/Store';
import Organization, { ListOrgsResponse, OrgResponse } from './Organization';
import { CreateOrganizationException } from './Organization/exceptions';
// import Project from './Project';
// import SparqlView from './views/SparqlView';
// import ElasticSeachView from './views/ElasticSearchView';

type NexusConfig = {
  environment: string;
  token?: string;
};

export const store: Store = new Store({
  auth: {
    accessToken: null,
  },
  api: {
    baseUrl: null,
  },
});

export default class Nexus {
  constructor(config: NexusConfig) {
    if (!config) {
      throw new Error('You need to provide a Nexus config.');
    }
    if (!config.environment) {
      throw new Error(
        'No environment provided. Please specify your Nexus instance endpoint.',
      );
    }
    store.update('api', state => ({
      ...state,
      baseUrl: config.environment,
    }));
    if (config.token) {
      store.update('auth', state => ({
        ...state,
        accessToken: config.token,
      }));
    }
  }

  setToken(token: string): void {
    store.update('auth', state => ({
      ...state,
      accessToken: token,
    }));
  }

  removeToken(): void {
    store.update('auth', state => ({
      ...state,
      accessToken: undefined,
    }));
  }

  // TODO: refactor -> blocked by https://github.com/BlueBrain/nexus/issues/112
  async listOrganizations(): Promise<Organization[]> {
    try {
      const listOrgsResponse: ListOrgsResponse = await httpGet('/projects');
      if (listOrgsResponse.code || !listOrgsResponse._results) {
        return [];
      }
      // Get list of unique orgs names
      const filteredOrgNames: string[] = listOrgsResponse._results
        .map(org => {
          const split = org._id.split('/');
          const orgName = split.slice(split.length - 2, split.length - 1)[0];
          return orgName;
        })
        .filter((org, index, self) => self.indexOf(org) === index);

      // get orgs details
      return Promise.all(
        filteredOrgNames.map(async org => await this.getOrganization(org)),
      );
    } catch (e) {
      throw new Error(`ListOrgsError: ${e}`);
    }
  }

  // TODO: refactor -> blocked by https://github.com/BlueBrain/nexus/issues/112
  async getOrganization(name: string): Promise<Organization> {
    try {
      const orgResponse: OrgResponse = await httpGet(`/orgs/${name}`);
      // we want to know how many projects there are per organisation
      const listOrgsResponse: ListOrgsResponse = await httpGet('/projects');
      const projectNumber: number = listOrgsResponse._results
        ? listOrgsResponse._results.reduce((prev, org) => {
            const split = org._id.split('/');
            const orgName = split.slice(split.length - 2, split.length - 1)[0];
            if (orgName === name) {
              return prev + 1;
            }
            return prev;
          }, 0)
        : 0;

      const org = new Organization({ ...orgResponse, projectNumber });
      return org;
    } catch (e) {
      throw new Error(`ListOrgsError: ${e}`);
    }
  }

  async createOrganization(label: string, name: string): Promise<Organization> {
    try {
      const orgResponse: OrgResponse = await httpPut(`/orgs/${label}`, {
        name,
      });
      return new Organization({
        ...orgResponse,
        projectNumber: 0,
        _deprecated: false,
      });
    } catch (error) {
      throw new CreateOrganizationException(error.message);
    }
  }
}

// // Debugggg
// const nexus = new Nexus({
//   // environment: 'https://bbp-nexus.epfl.ch/staging/v1',
//   environment: 'https://bbp.epfl.ch/nexus/v1',
//   // token: ''
// });

// // Promise.all([
// //   nexus
// //     .getOrganization('kenny')
// //     .then((org: Organization) => {
// //       console.log(org.id);
// //       return org.getProject('search');
// //     })
// //     .then((project: Project) => {
// //       console.log(project.id);
// //       return project.listSparqlViews();
// //     })
// //     .then((svs: SparqlView[]) => {
// //       console.log(svs);
// //       return svs[0].query('SELECT ?A ?edge ?B where {?A ?edge ?B} LIMIT 50');
// //     })
// //     .then(r => console.log(r))
// //     .catch(e => console.error(e)),
// // ]);

// Promise.all([
//   nexus
//     .getOrganization('anorg')
//     .then((org: Organization) => {
//       console.log(org.id);
//       return org.getProject('testcore');
//     })
//     .then((project: Project) => {
//       console.log(project.id);
//       return project.listElasticSearchViews();
//     })
//     .then((evs: ElasticSeachView[]) => {
//       console.log(evs);
//       return evs[0].filterByTypes(['http://schema.org/Person']);
//     })
//     .then(r => console.log(JSON.stringify(r, null, 2)))
//     .catch(e => console.error(e)),
// ]);
