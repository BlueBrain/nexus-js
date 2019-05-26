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

export type Context = string | (string | { [key: string]: string })[];

export type Resource = {
  '@context?': Context;
  '@type': string | string[];
  '@id': string;
  _incoming: string;
  _outgoing: string;
  '@id': string;
  _self: string;
  _constrainedBy: string;
  _project: string;
  _rev: number;
  _deprecated: boolean;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
};

export type PaginatedResource<T = Resource> = {
  '@context': Context;
  total: number;
  _result: T[];
  _next?: string;
};

export * from './File/types';
export * from './Identity/types';
export * from './Organization/types';
export * from './Project/types';
export * from './Resolver/types';
export * from './Schema/types';
export * from './Storage/types';
export * from './View/types';
