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

  // TODO: refactor -> blocked by https://github.com/BlueBrain/nexus/issues/112
  async listProjects(): Promise<Project[]> {
    try {
      const listOrgsResponse: ListOrgsResponse = await httpGet('/projects');
      if (listOrgsResponse.code || !listOrgsResponse._results) {
        return [];
      }
      // Get list of unique orgs names
      const filteredOrgNames: {
        orgName: string;
        projectName: string;
      }[] = listOrgsResponse._results
        .map(org => {
          const split = org._id.split('/');
          const [orgName, projectName] = split.slice(
            split.length - 2,
            split.length,
          );
          return { orgName, projectName };
        })
        .filter(({ orgName }) => orgName === this.label);

      return Promise.all(
        filteredOrgNames.map(
          async ({ projectName }) => await this.getProject(projectName),
        ),
      );
    } catch (e) {
      return e;
    }
  }

  async getProject(projectName: string): Promise<Project> {
    try {
      const projectResponse: ProjectResponse = await httpGet(
        `/projects/${this.label}/${projectName}`,
      );
      const project = new Project(projectResponse);
      return project;
    } catch (e) {
      return e;
    }
  }
}
