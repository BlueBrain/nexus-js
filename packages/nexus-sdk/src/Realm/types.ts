import { Context } from '../types';

export type Realm = {
  '@context'?: Context;
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
};

export type RealmList = {
  '@context': Context;
  _total: number;
  _results: Realm[];
};

export type GetRealmOptions = {
  rev?: number;
  [key: string]: any;
};

// TODO: are createdBy and updatedBy available for this endpoint?
// https://bluebrainnexus.io/docs/api/1.1/iam/iam-realms-api.html#list-realms
export type ListRealmOptions = {
  from?: number;
  size?: number;
  deprecated?: boolean;
  [key: string]: any;
};

export type RealmPayload = {
  name: string;
  openIdConfig: string;
  logo?: string;
};
