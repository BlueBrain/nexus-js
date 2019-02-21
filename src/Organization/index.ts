import Project from '../Project';
import {
  createOrganization,
  getOrganization,
  listOrganizations,
  deprecateOrganization,
  updateOrganization,
  subscribe,
} from './utils';
import { Context, CreateOrgPayload, OrgResponse } from './types';
import { ListProjectOptions, CreateProjectPayload } from '../Project/types';
import { PaginatedList } from '../utils/types';

export default class Organization {
  context?: Context;
  id: string;
  type: string;
  uuid: string;
  label: string;
  rev: number;
  deprecated: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  self?: string;
  constrainedBy?: string;
  description?: string;

  static get = getOrganization;
  static list = listOrganizations;
  static create = createOrganization;
  static update = updateOrganization;
  static deprecate = deprecateOrganization;
  static subscribe = subscribe;

  constructor(organizationResponse: OrgResponse) {
    this.context = organizationResponse['@context'];
    this.id = organizationResponse['@id'];
    this.type = organizationResponse['@type'];
    this.uuid = organizationResponse._uuid;
    this.label = organizationResponse._label;
    this.rev = organizationResponse._rev;
    this.deprecated = organizationResponse._deprecated;
    this.createdAt = organizationResponse._createdAt;
    this.createdBy = organizationResponse._createdBy;
    this.updatedAt = organizationResponse._updatedAt;
    this.updatedBy = organizationResponse._updatedBy;
    this.self = organizationResponse._self;
    this.constrainedBy = organizationResponse._constrainedBy;
    this.description = organizationResponse.description;
  }

  async update(orgPayload: CreateOrgPayload): Promise<Organization> {
    try {
      return Organization.update(this.label, this.rev, orgPayload);
    } catch (error) {
      throw error;
    }
  }

  async deprecate(): Promise<Organization> {
    try {
      return Organization.deprecate(this.label, this.rev);
    } catch (error) {
      throw error;
    }
  }

  async getProject(projectLabel: string): Promise<Project> {
    try {
      return Project.get(this.label, projectLabel);
    } catch (error) {
      throw error;
    }
  }

  async listProjects(
    options?: ListProjectOptions,
  ): Promise<PaginatedList<Project>> {
    try {
      return Project.list(this.label, options);
    } catch (error) {
      throw error;
    }
  }

  async createProject(
    projectLabel: string,
    projectPayload: CreateProjectPayload,
  ): Promise<Project> {
    try {
      return Project.create(this.label, projectLabel, projectPayload);
    } catch (error) {
      throw error;
    }
  }

  async updateProject(
    projectLabel: string,
    projectRev: number,
    projectPayload: CreateProjectPayload,
  ): Promise<Project> {
    try {
      return Project.update(
        this.label,
        projectLabel,
        projectRev,
        projectPayload,
      );
    } catch (error) {
      throw error;
    }
  }

  async deprecateProject(
    projectLabel: string,
    projectRev: number,
  ): Promise<Project> {
    try {
      return Project.deprecate(this.label, projectLabel, projectRev);
    } catch (error) {
      throw error;
    }
  }
}
