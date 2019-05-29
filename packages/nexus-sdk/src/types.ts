import { StatefulLink, Link, Context, Operation } from '@bbp/nexus-link';

export type NexusClientOptions = {
  uri: string;
  version: string;
  links?: (StatefulLink | Link)[];
  context?: Context;
  fetch?: any; // fetch api implementation
};

export type Fetchers = {
  httpGet: (operation: Operation) => Promise<any>;
  httpPost: (operation: Operation) => Promise<any>;
  httpPut: (operation: Operation) => Promise<any>;
  httpPatch: (operation: Operation) => Promise<any>;
  httpDelete: (operation: Operation) => Promise<any>;
  poll: Link;
};

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
