import { Context, Distribution } from '../utils/types';
import { httpGet } from '../utils/http';

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
  '_distribution',
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
  _distribution?: Distribution;
  // This is for the rest of the dataset's data
  [key: string]: any;
}

export interface ListResourceResponse {
  '@context': Context;
  _total: number;
  _results: ResourceResponseCommon[];
}

export interface ResourceResponse extends ResourceResponseCommon {
  '@context': Context;
}

export const getResource = async (
  id: string,
  orgLabel: string,
  projectLabel: string,
): Promise<Resource> => {
  try {
    const resourceResponse: ResourceResponse = await httpGet(id, false);
    const resource = new Resource(orgLabel, projectLabel, resourceResponse);
    return resource;
  } catch (e) {
    return e;
  }
};

export default class Resource<T = {}> {
  orgLabel: string;
  projectLabel: string;
  context?: Context;
  type?: string[];
  self: URL;
  id: string;
  constrainedBy: string;
  project: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  rev: number;
  deprecated: boolean;
  distribution?: Distribution | Distribution[];
  data: T;
  constructor(
    orgLabel: string,
    projectLabel: string,
    resourceResponse: ResourceResponseCommon,
  ) {
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.id = resourceResponse['@id'];
    if (resourceResponse['@type']) {
      if (Array.isArray(resourceResponse['@type'])) {
        this.type = resourceResponse['@type'] as string[];
      } else {
        this.type = [resourceResponse['@type']] as string[];
      }
    }
    if (resourceResponse['@context']) {
      this.context = resourceResponse['@context'];
    }
    this.self = new URL(resourceResponse._self);
    this.constrainedBy = resourceResponse._constrainedBy;
    this.project = resourceResponse._project;
    this.createdAt = resourceResponse._createdAt;
    this.createdBy = resourceResponse._createdBy;
    this.updatedAt = resourceResponse._updatedAt;
    this.updatedBy = resourceResponse._updatedBy;
    this.distribution = resourceResponse._distribution;
    this.rev = resourceResponse._rev;
    this.deprecated = resourceResponse._deprecated;
    this.data = Object.keys(resourceResponse).reduce(
      (memo: any, key: string) => {
        if (!RESOURCE_METADATA_KEYS.includes(key)) {
          memo[key] = resourceResponse[key];
        }
        return memo;
      },
      {},
    );
  }
}
