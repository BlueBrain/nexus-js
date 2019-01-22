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
