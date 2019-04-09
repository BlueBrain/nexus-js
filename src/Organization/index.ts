import Project from '../Project';
import makeOrgUtils, { OrgUtils } from './utils';
import { Context, CreateOrgPayload, OrgResponse } from './types';
import { ListProjectOptions, CreateProjectPayload } from '../Project/types';
import { PaginatedList } from '../utils/types';
import store from '../store';
import Store from '../utils/Store';
import makeProjectUtils, { ProjectUtils } from '../Project/utils';

// default utils functions
// they use the global store
// for token and baseUrl
const {
  create: createOrganization,
  get: getOrganization,
  list: listOrganizations,
  deprecate: deprecateOrganization,
  update: updateOrganization,
  subscribe,
} = makeOrgUtils(store);

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
  orgUtils?: OrgUtils;
  projectUtils?: ProjectUtils;

  // expose default utils through static methods
  static get = getOrganization;
  static list = listOrganizations;
  static create = createOrganization;
  static update = updateOrganization;
  static deprecate = deprecateOrganization;

  constructor(organizationResponse: OrgResponse, localStore?: Store) {
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
    if (localStore) {
      this.orgUtils = makeOrgUtils(localStore);
      this.projectUtils = makeProjectUtils(localStore);
    }
  }

  async update(orgPayload: CreateOrgPayload): Promise<Organization> {
    const update = this.orgUtils ? this.orgUtils.update : updateOrganization;
    try {
      return update(this.label, this.rev, orgPayload);
    } catch (error) {
      throw error;
    }
  }

  async deprecate(): Promise<Organization> {
    const deprecate = this.orgUtils
      ? this.orgUtils.deprecate
      : deprecateOrganization;
    try {
      return deprecate(this.label, this.rev);
    } catch (error) {
      throw error;
    }
  }

  async getProject(projectLabel: string): Promise<Project> {
    const getProject = this.projectUtils ? this.projectUtils.get : Project.get;
    try {
      return getProject(this.label, projectLabel);
    } catch (error) {
      throw error;
    }
  }

  async listProjects(
    options?: ListProjectOptions,
  ): Promise<PaginatedList<Project>> {
    const listProject = this.projectUtils
      ? this.projectUtils.list
      : Project.list;
    try {
      return listProject(this.label, options);
    } catch (error) {
      throw error;
    }
  }

  async createProject(
    projectLabel: string,
    projectPayload: CreateProjectPayload,
  ): Promise<Project> {
    const createProject = this.projectUtils
      ? this.projectUtils.create
      : Project.create;
    try {
      return createProject(this.label, projectLabel, projectPayload);
    } catch (error) {
      throw error;
    }
  }

  async updateProject(
    projectLabel: string,
    projectRev: number,
    projectPayload: CreateProjectPayload,
  ): Promise<Project> {
    const updateProject = this.projectUtils
      ? this.projectUtils.update
      : Project.update;
    try {
      return updateProject(
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
    const deprecateProject = this.projectUtils
      ? this.projectUtils.deprecate
      : Project.deprecate;
    try {
      return deprecateProject(this.label, projectLabel, projectRev);
    } catch (error) {
      throw error;
    }
  }
}
