import { StatefulLink, Link, Context } from '@bbp/nexus-link';

export type NexusClientOptions = {
  uri: string;
  version: string;
  links?: (StatefulLink | Link)[];
  context?: Context;
};

export type Fetchers = {
  httpGet: Link;
  httpPost: Link;
  httpPut: Link;
  httpPatch: Link;
  httpDelete: Link;
  poll: Link;
};

export enum FetchAs {
  BLOB = 'blob',
  TEXT = 'text',
  DOCUMENT = 'document',
  JSON = 'json',
}

export type Context = string | (string | { [key: string]: string })[];

export * from './Resource/types';
export * from './File/types';
export * from './Identity/types';
export * from './Organization/types';
export * from './Project/types';
export * from './Resolver/types';
export * from './Schema/types';
export * from './Storage/types';
export * from './View/types';
export * from './Realm/types';
export * from './Permissions/types';
export * from './ACL/types';
