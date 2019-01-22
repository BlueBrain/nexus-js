import Project from '../Project';
import {
  createOrganization,
  getOrganization,
  listOrganizations,
  deprecateOrganization,
  updateOrganization,
} from './utils';
import { Context } from './types';

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

export default class Organization {
  context?: Context;
  id: string;
  type: string;
  uuid: string;
  label: string;
  rev: number;
  deprecated: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  self?: string;
  constrainedBy?: string;
  description?: string;

  static get = getOrganization;
  static list = listOrganizations;
  static create = createOrganization;
  static update = updateOrganization;
  static deprecate = deprecateOrganization;

  constructor(organizationResponse: OrgResponse) {
    this.context = organizationResponse['@context'];
    this.id = organizationResponse['@id'];
    this.type = organizationResponse['@type'];
    this.uuid = organizationResponse._uuid;
    this.label = organizationResponse._label;
    this.rev = organizationResponse._rev;
    this.deprecated = organizationResponse._deprecated;
    this.createdAt = organizationResponse._createdAt;
    this.createdBy = organizationResponse._createdBy;
    this.updatedAt = organizationResponse._updatedAt;
    this.updatedBy = organizationResponse._updatedBy;
    this.self = organizationResponse._self;
    this.constrainedBy = organizationResponse._constrainedBy;
    this.description = organizationResponse.description;
  }

  async getProject(projectLabel: string): Promise<Project> {
    return Project.get(this.label, projectLabel);
  }

  async listProjects(): Promise<Project[]> {
    return Project.list(this.label);
  }
}
