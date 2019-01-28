import { RealmResponse } from './types';
import { getRealm, listRealms, createRealm } from './utils';

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
  endSessionEnpoint: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  rev: number;
  deprecated: boolean;

  static get = getRealm;
  static list = listRealms;
  static create = createRealm;

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
    this.endSessionEnpoint = realmResponse._endSessionEndpoint;
    this.createdAt = realmResponse._createdAt;
    this.createdBy = realmResponse._createdBy;
    this.updatedAt = realmResponse._updatedAt;
    this.updatedBy = realmResponse._updatedBy;
    this.rev = realmResponse._rev;
    this.deprecated = realmResponse._deprecated;
  }
}
