import { httpGet } from './utils/http';
import Project, { ProjectResponse } from './Project';

export interface ListOrgsResponse {
  '@context': string;
  _total: number;
  _links?: string;
  _results?: [{ _id: string }];
  code?: string;
  message?: string;
}

export interface OrgResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  label: string;
  name: string;
  _deprecated: boolean;
  _rev: number;
  _uuid: string;
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

  constructor(organizationResponse: OrgResponse) {
    this.context = organizationResponse['@context'];
    this.id = organizationResponse['@id'];
    this.type = organizationResponse['@type'];
    this.label = organizationResponse.label;
    this.name = organizationResponse.name;
    this.deprecated = organizationResponse._deprecated;
    this.rev = organizationResponse._rev;
    this.uuid = organizationResponse._uuid;
  }

  async listProjects(): Promise<Project[]> {
    try {
      const projects = await httpGet(`/projects/${this.name}`);
      return projects.map((project: ProjectResponse) => new Project(project));
    } catch (e) {
      return e;
    }
  }
}
