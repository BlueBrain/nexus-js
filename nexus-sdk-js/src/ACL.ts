export type PermissionsEndpointResponse = {
  "@context"?: string | string[];
  "@id": string;
  "@type": string;
  permissions: string[];
  _rev: number;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
}

export type IdentityType = 'User' | 'Group' | 'Authenticated' | 'Anonymous';

export type IdentitiesEndpointResponse = {
  '@context'?: string | string[];
  identities: IdentityResponse[];
}

export type IdentityResponse = {
  '@id': string;
  '@type': IdentityType;
  subject?: string;
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
