import { Context } from '../utils/types';
import {
  ResourceMetadataKeys,
  ResourceResponseCommon,
  ResourceResponse,
  ListResourceResponse,
} from './types';

export {
  ResourceResponse,
  ResourceResponseCommon,
  ResourceMetadataKeys,
  ListResourceResponse,
};

export default class Resource {
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
      if (Array.isArray(resourceResponse['@type'])) {
        this.type = resourceResponse['@type'] as Array<string>;
      } else {
        this.type = new Array(resourceResponse['@type']) as Array<string>;
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
    this.rev = resourceResponse._rev;
    this.deprecated = resourceResponse._deprecated;
    this.data = Object.keys(resourceResponse)
      .filter(
        key =>
          !Object.keys(ResourceMetadataKeys)
            .map(key => ResourceMetadataKeys[key])
            .includes(key),
      )
      .reduce((obj: any, key: string) => {
        obj[key] = resourceResponse[key];
        return obj;
      }, {});
  }
}
