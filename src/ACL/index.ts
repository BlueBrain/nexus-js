import { IdentityType, Identity, ACLResponse } from './types';
import {
  listACL,
  createACL,
  replaceACL,
  subtractACL,
  appendACL,
  deleteACL,
  listIdentities,
} from './utils';

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

  static list = listACL;
  static create = createACL;
  static replace = replaceACL;
  static subtract = subtractACL;
  static append = appendACL;
  static delete = deleteACL;
  static listIdentities = listIdentities;

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
