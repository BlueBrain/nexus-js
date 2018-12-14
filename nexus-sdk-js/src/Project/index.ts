import Resource, { ListResourceResponse, getResource } from './Resource';
import { httpGet } from './utils/http';
import { PaginationSettings, PaginatedList } from './utils/types';

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

  async listResources(
    pagination?: PaginationSettings,
  ): Promise<PaginatedList<Resource>> {
    try {
      const requestURL = pagination
        ? `${this.projectResourceURL}?from=${pagination.from}&size=${
            pagination.size
          }`
        : this.projectResourceURL;

      const listResourceResponses: ListResourceResponse = await httpGet(
        requestURL,
      );

      const total: number = listResourceResponses._total;

      // Expand the data for each item in the list
      // By fetching each item by ID
      const results: Resource[] = await Promise.all(
        listResourceResponses._results.map(async resource => {
          return await this.getResource(resource['_self']);
        }),
      );

      return {
        total,
        results,
      };
    } catch (e) {
      return e;
    }
  }

  async getResource(id: string): Promise<Resource> {
    return await getResource(id, this.orgLabel, this.label);
  }
}
