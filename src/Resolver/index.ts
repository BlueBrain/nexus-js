import { getResolver, listResolvers, normalizeType, isValidType } from './utils';
import { ResolverResponse, ResolverTypes } from './types';
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
  /*static async create(method: "POST" | "PUT" = "PUT") {};
  static async update() {};
  static async tag() {};
  static async deprecate() {};
  static async list() {};*/

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
    this.type = (resolverResponse["@type"] as string[]).map(normalizeType).find(isValidType) || "InProject";
  }
}
