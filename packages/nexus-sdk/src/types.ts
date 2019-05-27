import { StatefulLink, Link, Context } from '@bbp/nexus-link';
export * from './Identity/types';

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
  _incoming: string;
  _outgoing: string;
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
