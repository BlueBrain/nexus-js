import Resource, { ListResourceResponse } from '../Resource';
import { httpGet } from '../utils/http';
import { PaginationSettings, PaginatedList } from '../utils/types';
import View from '../View';
import ElasticSearchView from '../View/ElasticSearchView';
import SparqlView from '../View/SparqlView';
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

export interface ListProjectsResponse {
  '@context': string;
  _total: number;
  _links?: any;
  _results?: ProjectResponse[];
  code?: string;
  message?: string;
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

  async listViews(): Promise<(ElasticSearchView | SparqlView)[]> {
    return View.list(this.orgLabel, this.label);
  }

  async getView(viewId: string): Promise<ElasticSearchView | SparqlView> {
    return View.get(this.orgLabel, this.label, viewId)
  }

  async getElasticSearchView(viewId?: string): Promise<ElasticSearchView> {
    return ElasticSearchView.get(this.orgLabel, this.label, viewId);
  }

  async getSparqlView(): Promise<SparqlView> {
    return SparqlView.get(this.orgLabel, this.label);
  }
}
