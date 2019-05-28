import { Identity, Context } from '../types';

export type ACLType = 'AccessControlList';

export type ACL = {
  '@context'?: Context;
  '@id': string;
  '@type': ACLType;
  _path?: string;
  acl?: {
    permissions: string[];
    identity: Identity;
  }[];
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  _rev: number;
};

export type ACLList = {
  '@context': Context;
  _total: number;
  _results: ACL[];
};

export type ListACLOptions = {
  from?: number;
  size?: number;
  rev?: number;
  ancestors?: true;
  self?: boolean;
  [key: string]: any;
};

export type ACLPayload = {
  acl: {
    permissions: string[];
    identity: {
      subject?: string;
      realm?: string;
      group?: string;
    };
  }[];
};
