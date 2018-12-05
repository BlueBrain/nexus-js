import { Context } from './utils/types';

// TODO make it an enum?
// This uses the enum style with capitalized keys
// However it seems that typescript doesn't let you
// use enum members as keys :(
export const ResourceMetadataKeys: { [key: string]: string } = {
  Context: '@context',
  ID: '@id',
  Type: '@type',
  Self: '_self',
  ConstrainedBy: '_constrainedBy',
  Project: '_project',
  CreatedAt: '_createdAt',
  CreatedBy: '_createdBy',
  UpdatedAt: '_updatedAt',
  UpdatedBy: '_updatedBy',
  Rev: '_rev',
  Deprecated: '_deprecated',
};

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
  '@context': Context[];
  _total: number;
  _results: ResourceResponseCommon[];
}
export interface ResourceResponse extends ResourceResponseCommon {
  '@context': Context[];
}

export default class Resource {
  orgLabel: string;
  projectLabel: string;
  context?: Context;
  type?: URL[];
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
  data: any;
  constructor(
    orgLabel: string,
    projectLabel: string,
    resourceResponse: ResourceResponseCommon,
  ) {
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.id = resourceResponse['@id'];
    if (resourceResponse['@type']) {
      this.type = (resourceResponse['@type'] as Array<string>).map(
        uri => new URL(uri),
      );
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
    this.rev = resourceResponse._rev;
    this.deprecated = resourceResponse._deprecated;
    this.data = Object.keys(resourceResponse)
      .filter(key => !Object.values(ResourceMetadataKeys).includes(key))
      .reduce((obj: any, key: string) => {
        obj[key] = resourceResponse[key];
        return obj;
      }, {});
  }
}
