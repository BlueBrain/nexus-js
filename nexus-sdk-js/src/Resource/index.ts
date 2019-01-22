import { Context } from './types';
import {
  getResource,
  getSelfResource,
  updateResource,
  updateSelfResource,
  listResources,
  createResource,
  tagResource,
  deprecateResource,
  deprecateSelfResource,
  tagSelfResource,
} from './utils';

export const RESOURCE_METADATA_KEYS = [
  '@context',
  '@id',
  '@type',
  '_self',
  '_constrainedBy',
  '_project',
  '_createdAt',
  '_createdBy',
  '_updatedAt',
  '_updatedBy',
  '_rev',
  '_deprecated',
];

export interface ResourceResponseCommon {
  '@id': string;
  '@type'?: string | string[];
  _self: string;
  _constrainedBy: string;
  _project: string;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  _rev: number;
  _deprecated: boolean;
  // This is for the rest of the dataset's data
  [key: string]: any;
}

export interface ListResourceResponse {
  '@context'?: Context;
  _total: number;
  _results: ResourceResponseCommon[];
}

export interface ResourceResponse extends ResourceResponseCommon {
  '@context'?: Context;
}

export default class Resource<T = {}> {
  readonly orgLabel: string;
  readonly projectLabel: string;
  readonly context?: Context;
  readonly type?: string[];
  readonly self: string;
  readonly id: string;
  readonly constrainedBy: string;
  readonly project: string;
  readonly createdAt: string;
  readonly createdBy: string;
  readonly updatedAt: string;
  readonly updatedBy: string;
  readonly rev: number;
  readonly deprecated: boolean;
  readonly data: T;
  readonly raw: ResourceResponse;
  readonly resourceURL: string;

  static getSelf = getSelfResource;
  static get = getResource;
  static list = listResources;
  static create = createResource;
  static updateSelf = updateSelfResource;
  static update = updateResource;
  static deprecate = deprecateResource;
  static deprecateSelf = deprecateSelfResource;
  static tag = tagResource;
  static tagSelf = tagSelfResource;
  static formatName(raw: ResourceResponse): string {
    return (
      raw['skos:prefLabel'] ||
      raw['rdfs:label'] ||
      raw['schema:name'] ||
      raw['label'] ||
      raw['name'] ||
      raw['@id']
    );
  }

  constructor(
    orgLabel: string,
    projectLabel: string,
    resourceResponse: ResourceResponse,
  ) {
    this.raw = resourceResponse;
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.id = resourceResponse['@id'];
    this.context = resourceResponse['@context'];
    this.self = resourceResponse._self;
    this.constrainedBy = resourceResponse._constrainedBy;
    this.project = resourceResponse._project;
    this.createdAt = resourceResponse._createdAt;
    this.createdBy = resourceResponse._createdBy;
    this.updatedAt = resourceResponse._updatedAt;
    this.updatedBy = resourceResponse._updatedBy;
    this.rev = resourceResponse._rev;
    this.deprecated = resourceResponse._deprecated;
    // make type an array of sting, even if we only get a single string
    if (resourceResponse['@type']) {
      if (Array.isArray(resourceResponse['@type'])) {
        this.type = resourceResponse['@type'] as string[];
      } else {
        this.type = [resourceResponse['@type']] as string[];
      }
    }
    // Put user custom fields in "data" key
    this.data = Object.keys(resourceResponse).reduce(
      (memo: any, key: string) => {
        if (!RESOURCE_METADATA_KEYS.includes(key)) {
          memo[key] = resourceResponse[key];
        }
        return memo;
      },
      {},
    );
    this.resourceURL = `/resources/${this.orgLabel}/${
      this.projectLabel
    }/resource/${this.id}`;
  }

  get name(): string {
    return Resource.formatName(this.raw);
  }

  async update({
    context,
    ...data
  }: {
    context: { [field: string]: string };
    [field: string]: any;
  }): Promise<Resource> {
    return Resource.updateSelf(
      this.resourceURL,
      this.rev,
      {
        context,
        data,
      },
      this.orgLabel,
      this.projectLabel,
    );
  }

  toJSON() {
    return {
      ...Object.getOwnPropertyNames(this).reduce((memo: any, key) => {
        memo[key] = (this as any)[key];
        return memo;
      }, {}),
      name: this.name,
    };
  }
}
