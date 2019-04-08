import {
  getResolver,
  listResolvers,
  createResolver,
  updateResolver,
  tagResolver,
  deprecateResolver,
  normalizeType,
  isValidType,
} from './utils';
import {
  ResolverResponse,
  ResolverTypes,
  CrossProjectResolverPayload,
  TagResolverPayload,
} from './types';
import { Identity } from '../ACL/types';

export default class Resolver {
  readonly id: string;
  readonly type: ResolverTypes;
  readonly context: string | string[];
  readonly orgLabel: string;
  readonly projectLabel: string;
  readonly constrainedBy: string;
  readonly createdAt: string;
  readonly createdBy: string;
  readonly deprecated: Boolean;
  readonly project: string;
  readonly rev: number;
  readonly self: string;
  readonly updatedAt: string;
  readonly updatedBy: string;
  readonly priority: number;
  readonly projects?: string[];
  readonly resourceType?: string;
  readonly identities?: Identity[];
  readonly raw: ResolverResponse;

  static get = getResolver;
  static list = listResolvers;
  static create = createResolver;
  static update = updateResolver;
  static tag = tagResolver;
  static deprecate = deprecateResolver;

  constructor(
    orgLabel: string,
    projectLabel: string,
    resolverResponse: ResolverResponse,
  ) {
    this.id = resolverResponse["@id"];
    this.context = resolverResponse["@context"];
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.constrainedBy = resolverResponse._constrainedBy;
    this.createdAt = resolverResponse._createdAt;
    this.createdBy = resolverResponse._createdBy;
    this.updatedAt = resolverResponse._updatedAt;
    this.updatedBy = resolverResponse._updatedBy;
    this.deprecated = resolverResponse._deprecated;
    this.rev = resolverResponse._rev;
    this.self = resolverResponse._self;
    this.project = resolverResponse._project;
    this.priority = resolverResponse.priority;
    this.projects = resolverResponse.projects;
    this.resourceType = resolverResponse.resourceType;
    this.identities = resolverResponse.identities;
    this.raw = resolverResponse;
    this.type = (resolverResponse["@type"] as string[]).map(normalizeType).find(isValidType) || "CrossProject";
  }

  async update(
    resolverPayload: CrossProjectResolverPayload,
  ): Promise<Resolver> {
    const updatedResolver = Resolver.update(this.orgLabel, this.projectLabel, this.id, this.rev, resolverPayload);
    return updatedResolver;
  }

  async tag(tagPayload: TagResolverPayload): Promise<Resolver> {
    const updatedResolver = Resolver.tag(this.orgLabel, this.projectLabel, this.id, this.rev, tagPayload);
    return updatedResolver;
  }

  async deprecate(): Promise<Resolver> {
    const updatedResolver = Resolver.deprecate(this.orgLabel, this.projectLabel, this.id, this.rev);
    return updatedResolver;
  }
}
