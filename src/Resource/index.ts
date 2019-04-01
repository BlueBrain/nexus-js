import {
  Context,
  ResourceResponse,
  ResourceGetFormats,
  GetResourceOptions,
  ResourceLink,
  ExpandedResource,
} from './types';
import {
  getResource,
  getSelfResource,
  getSelfResourceRawAs,
  updateResource,
  updateSelfResource,
  listResources,
  createResource,
  tagResource,
  deprecateResource,
  deprecateSelfResource,
  tagSelfResource,
  listTags,
  listSelfTags,
  getIncomingLinks,
  getOutgoingLinks,
} from './utils';
import { PaginatedList, PaginationSettings } from '../utils/types';

export const DEFAULT_GET_RESOURCE_OPTIONS: GetResourceOptions = {
  expanded: false,
};

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
  expanded?: ExpandedResource;

  static getSelf = getSelfResource;
  static getSelfRawAs = getSelfResourceRawAs;
  static getIncomingLinks = getIncomingLinks;
  static getOutgoingLinks = getOutgoingLinks;
  static get = getResource;
  static list = listResources;
  static create = createResource;
  static updateSelf = updateSelfResource;
  static update = updateResource;
  static deprecate = deprecateResource;
  static deprecateSelf = deprecateSelfResource;
  static tag = tagResource;
  static tagSelf = tagSelfResource;
  static listTags = listTags;
  static listSelfTags = listSelfTags;
  static formatName(raw: ResourceResponse): string {
    const name =
      raw['skos:prefLabel'] ||
      raw['rdfs:label'] ||
      raw['schema:name'] ||
      raw['label'] ||
      raw['name'] ||
      // TODO move to File Class ?
      raw['_filename'] ||
      raw['@id'];
    return name;
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
    }/_/${encodeURIComponent(this.id)}`;
  }

  async getAs(format: ResourceGetFormats): Promise<any> {
    return await getSelfResourceRawAs(this.self, format);
  }

  get name(): string {
    return Resource.formatName(this.raw);
  }

  async update({
    context,
    ...data
  }: {
    context?: Context;
    [field: string]: any;
  }): Promise<Resource> {
    return Resource.updateSelf(
      this.resourceURL,
      this.rev,
      {
        context,
        ...data,
      },
      this.orgLabel,
      this.projectLabel,
    );
  }

  async getExpanded() {
    this.expanded = await getSelfResourceRawAs(`${this.self}?format=expanded`);
    return this.expanded;
  }

  async getIncomingLinks(
    paginationSettings: PaginationSettings,
  ): Promise<PaginatedList<ResourceLink>> {
    let expandedID;
    if (this.expanded && this.expanded['@id']) {
      expandedID = this.expanded['@id'];
    } else {
      await this.getExpanded();
      expandedID = (this.expanded as ExpandedResource)['@id'];
    }
    return await getIncomingLinks(
      this.orgLabel,
      this.projectLabel,
      expandedID,
      paginationSettings,
    );
  }

  async getOutgoingLinks(
    paginationSettings: PaginationSettings,
  ): Promise<PaginatedList<ResourceLink>> {
    let expandedID;
    if (this.expanded && this.expanded['@id']) {
      expandedID = this.expanded['@id'];
    } else {
      await this.getExpanded();
      expandedID = (this.expanded as ExpandedResource)['@id'];
    }
    return await getOutgoingLinks(
      this.orgLabel,
      this.projectLabel,
      expandedID,
      paginationSettings,
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
