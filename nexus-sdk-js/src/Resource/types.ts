import { Context } from '../utils/types';

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
