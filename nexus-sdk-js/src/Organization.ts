import { httpGet } from './utils/http';
import Project, { ProjectResponse } from './Project';

export type OrganizationResponse = {
  '@id': string;
};

export default class Organization {
  id: string;

  constructor(organizationResponse: OrganizationResponse) {
    this.id = organizationResponse['@id'];
  }

  async listProjects(): Promise<Project[]> {
    try {
      const projects = await httpGet(`/projects/${this.id}`);
      return projects.map((project: ProjectResponse) => new Project(project));
    } catch (e) {
      return e;
    }
  }
}
