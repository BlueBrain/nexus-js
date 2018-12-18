import { httpGet } from '../utils/http';
import Project, { ProjectResponse } from '../Project';
import { ListResourceResponse } from '../Resource';

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
      // Get project details
      const projectResponse: ProjectResponse = await httpGet(
        `/projects/${this.label}/${projectName}`,
      );
      // We want to know how many resources the project has
      const resourceResponse: ListResourceResponse = await httpGet(
        `/resources/${this.label}/${projectName}`,
      );
      const project = new Project(this.label, {
        ...projectResponse,
        resourceNumber: resourceResponse._total || 0,
      });
      return project;
    } catch (e) {
      return e;
    }
  }
}
