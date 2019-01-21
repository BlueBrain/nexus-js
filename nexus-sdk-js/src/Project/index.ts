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
import { ApiMapping, Context } from './types';

export interface ProjectResponseCommon {
  '@id': string;
  '@type': string;
  base: string;
  vocab: string;
  apiMappings: ApiMapping[];
  _label: string;
  _organizationLabel: string;
  _organizationUuid: string;
  _uuid: string;
  _rev: number;
  _deprecated: boolean;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
}

export interface ListProjectsResponse {
  _total: number;
  _links?: any;
  _results?: ProjectResponse[];
  '@context'?: Context;
  code?: string;
  message?: string;
}

export interface ProjectResponse extends ProjectResponseCommon {
  '@context'?: Context;
}

export default class Project {
  context?: Context;
  id: string;
  type: string;
  base: string;
  vocab: string;
  apiMappings: ApiMapping[];
  label: string;
  orgLabel: string;
  orgUuid: string;
  uuid: string;
  rev: number;
  deprecated: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;

  static get = getProject;
  static list = listProjects;
  static create = createProject;
  static update = updateProject;
  static tag = tagProject;
  static deprecate = deprecateProject;

  constructor(projectResponse: ProjectResponse) {
    this.context = projectResponse['@context'];
    this.id = projectResponse['@id'];
    this.type = projectResponse['@type'];
    this.base = projectResponse.base;
    this.vocab = projectResponse.vocab;
    this.apiMappings = projectResponse.apiMappings;
    this.label = projectResponse._label;
    this.orgLabel = projectResponse._organizationLabel;
    this.orgUuid = projectResponse._organizationUuid;
    this.uuid = projectResponse._uuid;
    this.rev = projectResponse._rev;
    this.deprecated = projectResponse._deprecated;
    this.createdAt = projectResponse._createdAt;
    this.createdBy = projectResponse._createdBy;
    this.updatedAt = projectResponse._updatedAt;
    this.updatedBy = projectResponse._updatedBy;
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
    return View.get(this.orgLabel, this.label, viewId);
  }

  async getElasticSearchView(viewId?: string): Promise<ElasticSearchView> {
    return ElasticSearchView.get(this.orgLabel, this.label, viewId);
  }

  async getSparqlView(): Promise<SparqlView> {
    return SparqlView.get(this.orgLabel, this.label);
  }
}
