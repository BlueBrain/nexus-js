export type Context = string | object;

export type Shape = {
  '@id': string;
  '@type': string;
  nodeKing: string;
  property: {
    datatype: string;
    minCount: number;
    path: string;
  };
  targetClass: string;
};

export interface SchemaResponseCommon {
  '@id': string;
  '@type': 'Schema';
  shapes: Shape[];
  _self: string;
  _constrainedBy: string;
  _project: string;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  _rev: number;
  _deprecated: boolean;
}

export interface ListSchemaResponse {
  '@context': Context;
  _total: number;
  _results: SchemaResponseCommon[];
}

export interface SchemaResponse extends SchemaResponseCommon {
  '@context': Context;
}

export interface ListSchemaResponseError {
  '@context': Context;
  code: string;
  message: string;
}

export interface SchemaResponseError {
  '@context': Context;
  code: string;
  message: string;
  ref: string;
}

export interface SchemaListTagResponse {
  '@context': Context;
  tags: string[];
}

export interface CreateSchemaPayload {
  schemaId?: string;
  context: { [field: string]: string };
  shapes: Shape[];
  [field: string]: any;
}

export interface ListSchemaOptions {
  full_text_search?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  rev?: number;
  type?: string;
  createdBy?: string;
  updatedBy?: string;
  [key: string]: any;
}
