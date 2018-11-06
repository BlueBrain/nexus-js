import Store from './utils/Store';
import Organization, { OrganizationResponse } from './Organization';
import { httpGet, httpPost } from './utils/http';

type NexusConfig = {
  environment: string,
  token: string,
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
    store.update('auth', state => ({
      ...state,
      accessToken: config.token,
    }));
    store.update('api', state => ({
      ...state,
      baseUrl: config.environment,
    }));
  }

  async listOrganizations(): Promise<Organization[]> {
    try {
      const orgs: OrganizationResponse[] = await httpGet('/orgs');
      return orgs.map((org: OrganizationResponse) => new Organization(org));
    } catch (e) {
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
