import Project from '../Project';
import {
  createOrganization,
  getOrganization,
  listOrganizations,
  deprecateOrganization,
  updateOrganization,
  tagOrganization,
} from './utils';

export interface ListOrgsResponse {
  '@context': string;
  _total: number;
  _links?: any;
  _results?: OrgResponse[];
  code?: string;
  message?: string;
}

export interface ListOrgsOptions {
  full_text_search?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  [key: string]: any;
}

export interface OrgResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  _label: string;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  _deprecated: boolean;
  _rev: number;
  _uuid: string;
  projectNumber?: number;

}

export default class Organization {
  context: string;
  id: string;
  type: string;
  label: string;
  deprecated: boolean;
  rev: number;
  uuid: string;
  projectNumber: number;

  static get = getOrganization;
  static list = listOrganizations;
  static create = createOrganization;
  static update = updateOrganization;
  static tag = tagOrganization;
  static deprecate = deprecateOrganization;

  constructor(organizationResponse: OrgResponse) {
    this.context = organizationResponse['@context'];
    this.id = organizationResponse['@id'];
    this.type = organizationResponse['@type'];
    this.label = organizationResponse._label;
    this.deprecated = organizationResponse._deprecated;
    this.rev = organizationResponse._rev;
    this.uuid = organizationResponse._uuid;
    this.projectNumber = organizationResponse.projectNumber || 0;
  }



  async getProject(projectLabel: string): Promise<Project> {
    return Project.get(this.label, projectLabel);
  }

  async listProjects(): Promise<Project[]> {
    return Project.list(this.label);
  }
}
