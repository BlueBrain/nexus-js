import { Context } from './utils/types';

interface ResourceResponseCommon {
  '@id': string;
  '@type': string;
  _self: string;
  _constrainedBy: string;
  _project: string;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  _rev: number;
  _deprecated: boolean;
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
  id: string;

  constructor(
    orgLabel: string,
    projectLabel: string,
    resourceResponse: ResourceResponse,
  ) {
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.id = resourceResponse['@id'];
  }
}
