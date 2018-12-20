import Project from '../Project';
import {
  createOrganization,
  getOrganization,
  listOrganizations,
} from './utils';

export interface ListOrgsResponse {
  '@context': string;
  _total: number;
  _links?: any;
  _results?: {
    _id: string;
    _source: {
      '@id': string;
    };
  }[];
  code?: string;
  message?: string;
}

export interface OrgResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  label: string;
  _self: string;
  _constrainedBy: string;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  name: string;
  _updatedBy: string;
  _deprecated: boolean;
  _rev: number;
  _uuid: string;
  projectNumber: number;
}

export default class Organization {
  context: string;
  id: string;
  type: string;
  label: string;
  name: string;
  deprecated: boolean;
  rev: number;
  uuid: string;
  projectNumber: number;

  static get = getOrganization;
  static create = createOrganization;
  static list = listOrganizations;

  constructor(organizationResponse: OrgResponse) {
    this.context = organizationResponse['@context'];
    this.id = organizationResponse['@id'];
    this.type = organizationResponse['@type'];
    this.label = organizationResponse.label;
    this.name = organizationResponse.name;
    this.deprecated = organizationResponse._deprecated;
    this.rev = organizationResponse._rev;
    this.uuid = organizationResponse._uuid;
    this.projectNumber = organizationResponse.projectNumber;
  }

  async getProject(projectLabel: string): Promise<Project> {
    return Project.get(this.label, projectLabel);
  }

  async listProjects(): Promise<Project[]> {
    return Project.list(this.label);
  }
}
