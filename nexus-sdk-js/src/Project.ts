import Resource, { ResourceResponse, ListResourceResponse } from './Resource';
import { httpGet } from './utils/http';

export interface PrefixMapping {
  prefix: string;
  namespace: string;
}

export interface ProjectResponse {
  '@id': string;
  '@context': string;
  '@type': string;
  code?: string;
  label: string;
  name: string;
  base: string;
  _rev: number;
  _deprecated: boolean;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  prefixMappings: PrefixMapping[];
  resourceNumber: number;
  _label?: string;
  _uuid?: string;
  _self?: string;
  _constrainedBy?: string;
}

export default class Project {
  orgLabel: string;
  id: string;
  context: string;
  type: string;
  label: string;
  name: string;
  base: string;
  version: number;
  deprecated: boolean;
  createdAt: Date;
  updatedAt: Date;
  prefixMappings: PrefixMapping[];
  resourceNumber: number;
  private projectResourceURL: string;

  constructor(orgLabel: string, projectResponse: ProjectResponse) {
    this.orgLabel = orgLabel;
    this.id = projectResponse['@id'];
    this.context = projectResponse['@context'];
    this.type = projectResponse['@type'];
    this.label = projectResponse['label'];
    this.name = projectResponse.name;
    this.base = projectResponse.base;
    this.version = projectResponse._rev;
    this.deprecated = projectResponse._deprecated;
    this.createdAt = new Date(projectResponse._createdAt);
    this.updatedAt = new Date(projectResponse._updatedAt);
    this.prefixMappings = projectResponse.prefixMappings;
    this.resourceNumber = projectResponse.resourceNumber;
    this.projectResourceURL = `/resources/${this.orgLabel}/${this.label}`;
  }

  async listResources(): Promise<Resource[]> {
    try {
      const listResourceResponses: ListResourceResponse = await httpGet(
        this.projectResourceURL,
      );

      // Expand the data for each item in the list
      // By fetching each item by ID
      return Promise.all(
        listResourceResponses._results.map(async resource => {
          return await this.getResource(resource['_self']);
        }),
      );
    } catch (e) {
      return e;
    }
  }

  async getResource(id: string): Promise<Resource> {
    try {
      const resourceResponse: ResourceResponse = await httpGet(id, false);
      const resource = new Resource(
        this.orgLabel,
        this.label,
        resourceResponse,
      );
      return resource;
    } catch (e) {
      return e;
    }
  }
}
