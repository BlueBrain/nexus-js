import { RealmResponse, CreateRealmPayload } from './types';
import {
  getRealm,
  listRealms,
  createRealm,
  updateRealm,
  deprecateRealm,
} from './utils';
import { CreateOrgPayload } from '../Organization/types';

export default class Realm {
  context?: string | string[];
  id: string;
  type: string;
  name: string;
  openidConfig: string;
  label: string;
  issuer: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userInfoEndpoint: string;
  endSessionEndpoint: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  rev: number;
  deprecated: boolean;

  static get = getRealm;
  static list = listRealms;
  static create = createRealm;
  static update = updateRealm;
  static deprecate = deprecateRealm;

  constructor(realmResponse: RealmResponse) {
    this.context = realmResponse['@context'];
    this.id = realmResponse['@id'];
    this.type = realmResponse['@type'];
    this.name = realmResponse.name;
    this.openidConfig = realmResponse.openidConfig;
    this.label = realmResponse._label;
    this.issuer = realmResponse._issuer;
    this.authorizationEndpoint = realmResponse._authorizationEndpoint;
    this.tokenEndpoint = realmResponse._tokenEndpoint;
    this.userInfoEndpoint = realmResponse._userInfoEndpoint;
    this.endSessionEndpoint = realmResponse._endSessionEndpoint;
    this.createdAt = realmResponse._createdAt;
    this.createdBy = realmResponse._createdBy;
    this.updatedAt = realmResponse._updatedAt;
    this.updatedBy = realmResponse._updatedBy;
    this.rev = realmResponse._rev;
    this.deprecated = realmResponse._deprecated;
  }

  async update(payload: CreateRealmPayload): Promise<Realm> {
    try {
      return Realm.update(this.label, this.rev, payload);
    } catch (error) {
      throw error;
    }
  }

  async deprecate(): Promise<Realm> {
    try {
      return Realm.deprecate(this.label, this.rev);
    } catch (error) {
      throw error;
    }
  }
}
