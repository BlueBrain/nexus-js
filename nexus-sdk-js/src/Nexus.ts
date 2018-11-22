import Store from './utils/Store';
import Organization, { OrganizationResponse } from './Organization';
import { httpGet, httpPost } from './utils/http';

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
    if (!config.environment) {
      throw new Error(
        'No environment provided. Please specify your Nexus instance endpoint.'
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

  async listOrganizations(): Promise<Organization[]> {
    try {
      const orgs: OrganizationResponse[] = await httpGet('/orgs');
      return orgs.map((org: OrganizationResponse) => new Organization(org));
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getOrganization(id: string): Promise<Organization> {
    try {
      const org: OrganizationResponse = await httpGet(`/orgs/${id}`);
      return new Organization(org);
    } catch (e) {
      return e;
    }
  }

  async createOrganization(): Promise<Organization> {
    try {
      const org: OrganizationResponse = await httpPost('/orgs', {});
      return new Organization(org);
    } catch (e) {
      return e;
    }
  }
}
