import store from './store';
import Organization from './Organization';
import { CreateOrgPayload, ListOrgOptions } from './Organization/types';
import makeOrgUtils, { OrgUtils } from './Organization/utils';
import { PaginatedList } from './utils/types';
import Store from './utils/Store';
import makeProjectUtils, { ProjectUtils } from './Project/utils';
import makeResourceUtils, { ResourceUtils } from './Resource/utils';
import makeFileUtils, { FileUtils } from './File/utils';
import Realm, { makeRealmUtils } from './Realm';
import { RealmUtils } from './Realm/types';

type NexusConfig = {
  environment?: string;
  token?: string;
};

// Without this, jest crashes really bad...
if (process.env.NODE === 'TEST') {
  Organization;
  Realm;
}

export default class Nexus {
  readonly store: Store;
  readonly Organization: OrgUtils;
  readonly Project: ProjectUtils;
  readonly Resource: ResourceUtils;
  readonly NexusFile: FileUtils;
  readonly Realm: RealmUtils;

  // update global store
  static setEnvironment(environment: string): void {
    store.update('api', state => ({
      ...state,
      baseUrl: environment,
    }));
  }

  // update global store
  static setToken(token: string): void {
    if (!token || token === undefined || token.length === 0) {
      throw new Error('Token is invalid.');
    }
    store.update('auth', state => ({
      ...state,
      accessToken: token,
    }));
  }

  // update global store
  static removeToken(): void {
    store.update('auth', state => ({
      ...state,
      accessToken: undefined,
    }));
  }

  constructor(config: NexusConfig) {
    if (!config.environment) {
      throw new Error('No environment provided');
    }
    this.store = new Store({
      auth: { accessToken: config.token },
      api: { baseUrl: config.environment },
    });

    this.Organization = makeOrgUtils(this.store);
    this.Project = makeProjectUtils(this.store);
    this.Resource = makeResourceUtils(this.store);
    this.NexusFile = makeFileUtils(this.store);
    this.Realm = makeRealmUtils(this.store);
  }

  setToken(token: string) {
    if (!token || token === undefined || token.length === 0) {
      throw new Error('Token is invalid.');
    }
    this.store.update('auth', state => ({
      ...state,
      accessToken: token,
    }));
  }

  removeToken(): void {
    this.store.update('auth', state => ({
      ...state,
      accessToken: undefined,
    }));
  }

  async getOrganization(label: string): Promise<Organization> {
    return this.Organization.get(label);
  }

  async listOrganizations(
    listOrgOptions?: ListOrgOptions,
  ): Promise<PaginatedList<Organization>> {
    try {
      return this.Organization.list(listOrgOptions);
    } catch (error) {
      throw error;
    }
  }

  async createOrganization(
    label: string,
    orgPayload?: CreateOrgPayload,
  ): Promise<Organization> {
    try {
      return this.Organization.create(label, orgPayload);
    } catch (error) {
      throw error;
    }
  }

  async updateOrganization(
    label: string,
    rev: number,
    orgPayload: CreateOrgPayload,
  ): Promise<Organization> {
    try {
      return this.Organization.update(label, rev, orgPayload);
    } catch (error) {
      throw error;
    }
  }

  async deprecateOrganization(
    label: string,
    rev: number,
  ): Promise<Organization> {
    try {
      return this.Organization.deprecate(label, rev);
    } catch (error) {
      throw error;
    }
  }
}
