import { Context, SchemaResponse, Shape } from './types';
import {
  getSchema,
  listSchemas,
  createSchema,
  updateSchema,
  tagSchema,
  listSchemaTags,
  deprecateSchema,
} from './utils';

export const WILDCARD_SCHEMA_ID = '_';

export default class Schema {
  readonly raw: SchemaResponse;
  readonly orgLabel: string;
  readonly projectLabel: string;
  readonly context: Context;
  readonly id: string;
  readonly type: string;
  readonly shapes?: Shape[];
  readonly self: string;
  readonly constrainedBy: string;
  readonly project: string;
  readonly createdAt: string;
  readonly createdBy: string;
  readonly updatedAt: string;
  readonly updatedBy: string;
  readonly rev: number;
  readonly deprecated: boolean;

  static get = getSchema;
  static list = listSchemas;
  static create = createSchema;
  static update = updateSchema;
  static tag = tagSchema;
  static listTags = listSchemaTags;
  static deprecate = deprecateSchema;

  constructor(
    orgLabel: string,
    projectLabel: string,
    resourceResponse: SchemaResponse,
  ) {
    this.raw = resourceResponse;
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.context = resourceResponse['@context'];
    this.id = resourceResponse['@id'];
    this.self = resourceResponse._self;
    this.type = resourceResponse['@type'];
    this.shapes = resourceResponse.shapes;
    this.constrainedBy = resourceResponse._constrainedBy;
    this.project = resourceResponse._project;
    this.createdAt = resourceResponse._createdAt;
    this.createdBy = resourceResponse._createdBy;
    this.updatedAt = resourceResponse._updatedAt;
    this.updatedBy = resourceResponse._updatedBy;
    this.rev = resourceResponse._rev;
    this.deprecated = resourceResponse._deprecated;
  }
}
