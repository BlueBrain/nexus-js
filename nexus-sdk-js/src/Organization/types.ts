export interface OrgResponseCommon {
  '@id': string;
  '@type': string;
  _uuid: string;
  _label: string;
  _rev: number;
  _deprecated: boolean;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  _self?: string;
  _constrainedBy?: string;
  description?: string;
}

export interface ListOrgResponse {
  '@context': Context;
  _total: number;
  _results?: OrgResponseCommon[];
  _links?: any;
  code?: string;
  message?: string;
}

export interface OrgResponse extends OrgResponseCommon {
  '@context': Context;
}

export interface ListOrgOptions {
  full_text_search?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  [key: string]: any;
}

export interface CreateOrgPayload {
  description?: string;
}
export type Context = string | string[];
