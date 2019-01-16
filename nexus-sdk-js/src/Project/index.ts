import Resource, { ListResourceResponse } from '../Resource';
import { httpGet } from '../utils/http';
import { PaginationSettings, PaginatedList } from '../utils/types';
import { ViewsListResponse } from '../views';
import ElasticSearchView, {
  ElasticSearchViewResponse,
} from '../views/ElasticSearchView';
import SparqlView, { SparqlViewResponse } from '../views/SparqlView';
import {
  getProject,
  listProjects,
  createProject,
  tagProject,
  deprecateProject,
  updateProject,
} from './utils';
import { PrefixMapping } from './types';

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

  static get = getProject;
  static list = listProjects;
  static create = createProject;
  static update = updateProject;
  static tag = tagProject;
  static deprecate = deprecateProject;

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
      return await Resource.list(this.orgLabel, this.label, pagination);
    } catch (error) {
      throw error;
    }
  }

  async getResource(id: string): Promise<Resource> {
    try {
      return await Resource.getSelf(id, this.orgLabel, this.label);
    } catch (error) {
      throw error;
    }
  }

  // The current API does not support pagination / filtering of views
  // This should be fixed when possible and converted to signature
  // Promise<PaginatedList<ElasticSearchView>>
  async listElasticSearchViews(): Promise<ElasticSearchView[]> {
    try {
      const viewURL = `/views/${this.orgLabel}/${this.label}`;
      const viewListResponse: ViewsListResponse = await httpGet(viewURL);
      const elasticSearchViews: ElasticSearchView[] = viewListResponse._results
        .filter(entry => entry['@type'].includes('ElasticView'))
        .map(
          elasticSearchViewResponse =>
            new ElasticSearchView(
              this.orgLabel,
              this.label,
              elasticSearchViewResponse as ElasticSearchViewResponse,
            ),
        );
      return elasticSearchViews;
    } catch (error) {
      throw error;
    }
  }

  // TODO: refactor once we can fetch views per IDs (broken just now)
  async getSparqlView(): Promise<SparqlView> {
    try {
      const viewURL = `/views/${this.orgLabel}/${this.label}`;
      const viewListResponse: ViewsListResponse = await httpGet(viewURL);
      const sparqlViews: SparqlView[] = viewListResponse._results
        .filter(entry => entry['@type'].includes('SparqlView'))
        .map(
          sparqlViewResponse =>
            new SparqlView(
              this.orgLabel,
              this.label,
              sparqlViewResponse as SparqlViewResponse,
            ),
        );
      return sparqlViews[0];
    } catch (error) {
      throw error;
    }
  }
}
