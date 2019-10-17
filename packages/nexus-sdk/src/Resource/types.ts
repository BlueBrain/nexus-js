import { Context, Resource, PaginatedResource } from '../types';

export type ResourceListOptions = {
  q?: string; // full text search query
  from?: number;
  size?: number;
  deprecated?: boolean;
  rev?: number;
  type?: string;
  createdBy?: string;
  updatedBy?: string;
  schema?: string;
  [key: string]: any;
};

export type ResourcePayload = {
  '@id'?: string;
  '@context'?: Context;
  '@type'?: Resource['@type'];
  [key: string]: any;
};

export type Resource = {
  '@context'?: Context;
  '@type'?: string | string[];
  '@id': string;
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
  _results: T[];
  _next?: string;
};

export type ResourceList<T> = PaginatedResource<Resource & T>;

export type GetResourceOptions = {
  rev?: number;
  tag?: string;
  [key: string]: any;
};

export type TagResourcePayload = {
  previousRev: number;
  tag: string;
  rev: number;
};
