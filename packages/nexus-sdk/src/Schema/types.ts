import { Resource, PaginatedResource, Context } from '../types';

//TODO: define shape type
export type Shape = {};

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
