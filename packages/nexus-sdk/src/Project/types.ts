import { Context } from '../types';

type ApiMapping = {
  prefix: string;
  namespace: string;
};

export type ProjectResponseCommon = {
  '@id': string;
  '@type': 'Project';
  apiMappings?: ApiMapping[];
  base?: string;
  description?: string;
  vocab?: string;
  _label: string;
  _organizationLabel: string;
  _organizationUuid: string;
  _rev: number;
  _deprecated: boolean;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  _self?: string;
  _constrainedBy?: string;
};

export type Project = ProjectResponseCommon & {
  '@context': Context;
};

export type ProjectList = {
  '@context': Context;
  _results: ProjectResponseCommon[];
  _total: number;
};

export type ProjectListOptions = {
  from?: number;
  size?: number;
  label?: string;
  deprecated?: boolean;
  [key: string]: any;
};

export type ProjectPayload = {
  description?: string;
  base?: string;
  vocab?: string;
  apiMappings?: ApiMapping[];
};
