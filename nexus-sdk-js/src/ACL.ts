export type Permission = 'read' | 'write' | 'own';

export type IdentityType = 'UserRef' | 'GroupRef' | 'AuthenticatedRef' | 'Anonymous';

export type IdentityResponse = {
  '@id': string;
  '@type': IdentityType;
  sub?: string;
  realm?: string;
  group?: string;
};

export type ACLResponse = {
  path: string;
  identity: IdentityResponse,
  permissions: Permission[],
};

export class Identity {
  id: string;
  type: IdentityType;
  realm?: string;
  group?: string;
  sub?: string;

  constructor(identityResponse: IdentityResponse) {
    this.id = identityResponse['@id'];
    this.type = identityResponse['@type'];
  }
}

export default class ACL {
  path: string;
  permissions: Permission[];
  identity: Identity;

  constructor(aclResponse: ACLResponse) {
    this.path = aclResponse.path;
    this.identity = new Identity(aclResponse.identity);
    this.permissions = aclResponse.permissions;
  }
}
