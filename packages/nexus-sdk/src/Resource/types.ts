import { Context, Resource } from '../types';

export const DEFAULT_SCHEMA_ID = '_';

export type ResourceList = {
  '@context': Context;
  _results: Resource[];
  _total: number;
};

export type ResourceListOptions = {
  full_text_search?: string;
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
  '@context': Context;
  '@type'?: Resource['@type'];
  [key: string]: any;
};
