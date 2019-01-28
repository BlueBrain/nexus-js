import { IdentityType, IdentityResponse, ACLResponse } from './types';

export default class ACL {
  id: string;
  type: IdentityType;
  path: string;
  acl: {
    permissions: string[];
    identity: IdentityResponse;
  }[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  rev: number;

  constructor(aclResponse: ACLResponse) {
    this.id = aclResponse['@id'];
    this.type = aclResponse['@type'];
    this.path = aclResponse._path;
    this.acl = aclResponse.acl;
    this.createdAt = aclResponse._createdAt;
    this.createdBy = aclResponse._createdBy;
    this.updatedAt = aclResponse._updatedBy;
    this.updatedBy = aclResponse._updatedBy;
    this.rev = aclResponse._rev;
  }
}
