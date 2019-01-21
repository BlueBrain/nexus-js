import store from './store';
import Organization from './Organization';
import { CreatOrgPayload } from './Organization/types';

type NexusConfig = {
  environment?: string;
  token?: string;
};

export default class Nexus {
  static store = store;

  static setEnvironment(environment: string): void {
    store.update('api', state => ({
      ...state,
      baseUrl: environment,
    }));
  }

  static setToken(token: string): void {
    if (!token || token === undefined || token.length === 0) {
      throw new Error('Token is invalid.');
    }
    store.update('auth', state => ({
      ...state,
      accessToken: token,
    }));
  }

  static removeToken(): void {
    store.update('auth', state => ({
      ...state,
      accessToken: undefined,
    }));
  }

  constructor(config?: NexusConfig) {
    if (config) {
      if (config.environment) {
        Nexus.setEnvironment(config.environment);
      }
      if (config.token) {
        Nexus.setToken(config.token);
      }
    }
  }

  async listOrganizations(): Promise<Organization[]> {
    return Organization.list();
  }

  async getOrganization(name: string): Promise<Organization> {
    return Organization.get(name);
  }

  async createOrganization(
    label: string,
    orgPayload?: CreatOrgPayload,
  ): Promise<Organization> {
    return Organization.create(label, orgPayload);
  }
}
