import { Resource, PaginatedResource, Context } from '../types';

export type Property = {
  datatype: string;
  minCount: number;
  path: string;
};

export type Shape = {
  '@id': string;
  '@type': string;
  nodeKind: string;
  property: Property[];
  targetClass: string;
};

export type Schema = Resource & {
  '@type': 'Schema';
  shapes: Shape[];
};

export type SchemaList = PaginatedResource<Schema>;

export type GetSchemaOptions = {
  rev?: number;
  tag?: string;
};
export type ListSchemaOptions = {
  full_text_search_query?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  rev?: number;
  type?: string;
  createdBy?: string;
  updatedBy?: string;
};

export type SchemaPayload = {
  '@context'?: Context;
  shapes: Shape[];
};
