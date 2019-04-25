import { RealmResponse, CreateRealmPayload, RealmUtils } from './types';
import store from '../store';
import Store from '../utils/Store';
import makeRealmUtils from './utils';
// 🚨 Stupid workaround alert! 🚨
// Please access makeRealmUtils from this file only
// as Realm.makeRealmUtils
// otherwise jest will explode
// claiming the utils.default is not a function!
export { default as makeRealmUtils } from './utils';

const {
  create: createRealm,
  get: getRealm,
  list: listRealms,
  deprecate: deprecateRealm,
  update: updateRealm,
} = makeRealmUtils(store);

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
  realmUtils?: RealmUtils;

  static get = getRealm;
  static list = listRealms;
  static create = createRealm;
  static update = updateRealm;
  static deprecate = deprecateRealm;

  constructor(realmResponse: RealmResponse, localStore?: Store) {
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
    if (localStore) {
      this.realmUtils = makeRealmUtils(localStore);
    }
  }

  async update(payload: CreateRealmPayload): Promise<Realm> {
    try {
      const update = this.realmUtils ? this.realmUtils.update : updateRealm;
      return update(this.label, this.rev, payload);
    } catch (error) {
      throw error;
    }
  }

  async deprecate(): Promise<Realm> {
    try {
      const deprecate = this.realmUtils
        ? this.realmUtils.deprecate
        : deprecateRealm;
      return deprecate(this.label, this.rev);
    } catch (error) {
      throw error;
    }
  }
}
