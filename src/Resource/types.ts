export interface ResourceResponseCommon {
  '@id': string;
  '@type'?: string | string[];
  _self: string;
  _constrainedBy: string;
  _project: string;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  _rev: number;
  _deprecated: boolean;
  // This is for the rest of the dataset's data
  [key: string]: any;
}

export interface ListResourceResponse {
  '@context'?: Context;
  _total: number;
  _results: ResourceResponseCommon[];
}

export interface ResourceResponse extends ResourceResponseCommon {
  '@context'?: Context;
}

export type Context = string | object;

export interface ListResourceResponseError {
  '@context': Context;
  code: string;
  message: string;
}

export interface ResourceResponseError {
  '@context': Context;
  code: string;
  message: string;
  ref: string;
}

export interface ResourceListTagResponse {
  '@context': Context;
  tags: string[];
}

export interface CreateResourcePayload {
  resourceId?: string;
  type?: string[];
  context: { [field: string]: string };
  [field: string]: any;
}

export interface UpdateResourcePayload {
  type?: string[];
  context?: { [field: string]: string };
  [field: string]: any;
}

export interface ListResourceOptions {
  full_text_search?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  [key: string]: any;
}

export enum ResourceGetFormat {
  JSON_LD = 'application/ld+json',
  DOT = 'text/vnd.graphviz',
  N_TRIPLES = 'application/ntriples',
}

export type ResourceGetFormats =
  | ResourceGetFormat.DOT
  | ResourceGetFormat.JSON_LD
  | ResourceGetFormat.N_TRIPLES;

export interface GetResourceOptions {
  expanded: boolean;
}
