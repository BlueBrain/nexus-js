import { httpGet, httpPut } from './utils/http';
import Store from './utils/Store';
import Organization, { ListOrgsResponse, OrgResponse } from './Organization';
import Project from './Project';
import Resource from './Resource';
import ACL from './ACL';
import { CreateOrganizationException } from './Organization/exceptions';
import SparqlView from './View/SparqlView';

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

// Debub
const nexus = new Nexus({
  environment: 'https://bbp-nexus.epfl.ch/staging/v1',
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJONS1CU0ZxZG5NS3Y4SWtKUkg1R3E0LVA2c1RWQUxwU0EydGNQeEpWM1NBIn0.eyJqdGkiOiJhMjBiMjY2OC00OWZiLTRiYjYtYmQzMC1hZDJhMzQyYTQ0Y2IiLCJleHAiOjE1NDUyMTEyNzksIm5iZiI6MCwiaWF0IjoxNTQ0Nzk5NjA0LCJpc3MiOiJodHRwczovL2JicHRlYW0uZXBmbC5jaC9hdXRoL3JlYWxtcy9CQlAiLCJhdWQiOiJiYnAtbmV4dXMtc3RhZ2luZyIsInN1YiI6ImY6OWQ0NmRkZDYtMTM0ZS00NGQ2LWFhNzQtYmRmMDBmNDhkZmNlOm1hY2hvbiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJicC1uZXh1cy1zdGFnaW5nIiwibm9uY2UiOiIxMjM0NTYiLCJhdXRoX3RpbWUiOjE1NDQ2MDY0NzksInNlc3Npb25fc3RhdGUiOiIxODlmYzQzMy02NmE2LTQ4YTEtYjIyMC04MzY3YjY1NjYyM2EiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlc291cmNlX2FjY2VzcyI6e30sInNjb3BlIjoib3BlbmlkIG5leHVzIiwibmFtZSI6Ikp1bGllbiBBbnRvbmluIE1hY2hvbiIsInByZWZlcnJlZF91c2VybmFtZSI6Im1hY2hvbiIsImdpdmVuX25hbWUiOiJKdWxpZW4gQW50b25pbiIsImZhbWlseV9uYW1lIjoiTWFjaG9uIiwiZW1haWwiOiJqdWxpZW4ubWFjaG9uQGVwZmwuY2gifQ.lMQLNS2r1QiVq0gGEzl3gVMdgKN1rhtmdMcpPhZN9xqwhuFOA0IBhHjeDiDGFjP9rLjoVEns487prWK8opaKamrliYpy-cNYk_VCzDuGN6fye2SaNcNPXCwqnPKuvpZyrBulXZ_9dd0cCcNSwgMCXHK8c6T3uKz-ECn4gZOCDhYG7rbvRcOm4QQs1UXD4j8ZSt5UnxTf0Eq0Vkh1LJDBHchWRyRfeJZw1IqwEHhUJYvnNh5NhA9PfWAuDKjYppm2VcMg695PAroZJ1P9HkRtNnOok-ldA_GE-yssIOkflUsT3C_7MBh046PKukHtAZfCYXOa1rPZBbEmlC_tfQkDJQ',
});
const sv = new SparqlView('kenny', 'search');
sv.query({ content: 'SELECT ?A ?edge ?B where {?A ?edge ?B} LIMIT 50' });
