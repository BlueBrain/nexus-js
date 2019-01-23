import { PaginationSettings } from '../utils/types';

export type Context = string | string[];

export interface RealmResponseCommon {
  '@id': string;
  '@type': string;
  name: string;
  openidConfig: string;
  _label: string;
  _issuer: string;
  _authorizationEndpoint: string;
  _tokenEndpoint: string;
  _userInfoEndpoint: string;
  _endSessionEndpoint: string;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  _rev: number;
  _deprecated: boolean;
}
export interface RealmResponse extends RealmResponseCommon {
  '@context': Context;
}
export interface ListRealmResponse {
  '@context': Context;
  _total: number;
  _results: RealmResponseCommon[];
}

export interface ListRealmOptions extends PaginationSettings {
  deprecated?: boolean;
  [key: string]: any;
}
