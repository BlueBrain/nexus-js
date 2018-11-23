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

export interface OrgInit {
  '@context': string;
  '@id': string;
  _label: string;
}

export default class Organization {
  context: string;
  id: string;
  label: string;

  constructor(organizationResponse: OrgInit) {
    this.context = organizationResponse['@context'];
    this.id = organizationResponse['@id'];
    this.label = organizationResponse._label;
  }

  async listProjects(): Promise<Project[]> {
    try {
      const projects = await httpGet(`/projects/${this.label}`);
      return projects.map((project: ProjectResponse) => new Project(project));
    } catch (e) {
      return e;
    }
  }
}
