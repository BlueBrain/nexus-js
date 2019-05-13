import { Context } from '../types';

type OrgResponseCommon = {
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
};

export type Organization = OrgResponseCommon & {
  '@context': Context;
};

export type OrganizationList = {
  '@context': Context;
  _results: OrgResponseCommon[];
  _total: number;
};

export type ListOrgOptions = {
  full_text_search?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  [key: string]: any;
};

export type CreateOrgPayload = {
  description?: string;
};
