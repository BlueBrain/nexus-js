import { IdentityType, Identity, ACLResponse } from './types';
import { getACL, listACL } from './utils';

export default class ACL {
  id: string;
  type: IdentityType;
  path: string;
  acl: {
    permissions: string[];
    identity: Identity;
  }[];
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  rev: number;

  static get = getACL;
  static list = listACL;

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
