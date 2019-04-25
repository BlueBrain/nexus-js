import { PaginationSettings, PaginatedList } from '../utils/types';
import Realm from '.';

export interface RealmUtils {
  get(realmLabel: string, rev?: number): Promise<Realm>;
  list(listRealmOptions?: ListRealmOptions): Promise<PaginatedList<Realm>>;
  create(realmLabel: string, realmPayload: CreateRealmPayload): Promise<Realm>;
  update(
    realmLabel: string,
    rev: number,
    realmPayload: CreateRealmPayload,
  ): Promise<Realm>;
  deprecate(realmLabel: string, rev: number): Promise<Realm>;
}

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

export interface ListRealmOptions {
  from?: PaginationSettings['from'];
  size?: PaginationSettings['size'];
  deprecated?: boolean;
  [key: string]: any;
}

export interface CreateRealmPayload {
  name: string;
  openIdConfig: string;
  logo?: string;
}
