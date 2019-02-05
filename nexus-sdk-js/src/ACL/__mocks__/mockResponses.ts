import {
  ListACLResponse,
  ACLOperationSuccess,
  IdentityResponse,
} from '../types';

export const mockIdentitiesResponse: IdentityResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/iam.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  identities: [
    {
      '@id': 'https://nexus.example.com/v1/anonymous',
      '@type': 'Anonymous',
    },
    {
      '@id': 'https://nexus.example.com/v1/realms/nexusdev/authenticated',
      '@type': 'Authenticated',
      realm: 'nexusdev',
    },
    {
      '@id': 'https://nexus.example.com/v1/realms/nexusdev/groups/test-group',
      '@type': 'Group',
      group: 'test-group',
      realm: 'nexusdev',
    },
    {
      '@id': 'https://nexus.example.com/v1/realms/nexusdev/users/test-user',
      '@type': 'User',
      realm: 'nexusdev',
      subject: 'test-user',
    },
  ],
};

export const mockACLOperationSuccess: ACLOperationSuccess = {
  '@context': 'https://bluebrain.github.io/nexus/contexts/resource.json',
  '@id': 'https://nexus.example.com/v1/acls/org1',
  '@type': 'AccessControlList',
  _rev: 5,
  _createdAt: '2018-09-18T09:58:00.801Z',
  _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _updatedAt: '2018-09-18T10:30:00.801Z',
  _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
};

export const mockListACLResponse: ListACLResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/resource.json',
    'https://bluebrain.github.io/nexus/contexts/iam.json',
    'https://bluebrain.github.io/nexus/contexts/search.json',
  ],
  _total: 2,
  _results: [
    {
      '@id': 'https://nexus.example.com/v1/acls/myorg/myproj',
      '@type': 'Authenticated',
      acl: [
        {
          permissions: ['read', 'write'],
          identity: {
            '@id': 'https://nexus.example.com/v1/realm/groups/two',
            '@type': 'Group',
            realm: 'myrealm',
            group: 'two',
          },
        },
      ],
      _path: '/myorg/myproj',
      _rev: 1,
      _createdAt: '2018-09-17T14:55:42.939Z',
      _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
      _updatedAt: '2018-09-17T15:05:42.939Z',
      _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
    },
    {
      '@id': 'https://nexus.example.com/v1/acls/myorg/myproj2',
      '@type': 'Anonymous',
      acl: [
        {
          permissions: ['read'],
          identity: {
            '@id': 'https://nexus.example.com/v1/realms/myrealm/users/me',
            '@type': 'User',
            realm: 'myrealm',
            subject: 'me',
          },
        },
      ],
      _path: '/myorg/myproj2',
      _rev: 2,
      _createdAt: '2018-09-17T14:00:42.939Z',
      _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/alice',
      _updatedAt: '2018-09-17T14:05:42.939Z',
      _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/alice',
    },
    {
      '@id': 'https://nexus.example.com/v1/acls/myorg/myproj',
      '@type': 'Authenticated',
      acl: [
        {
          permissions: ['read', 'write'],
          identity: {
            '@id': 'https://nexus.example.com/v1/realm/groups/two',
            '@type': 'Group',
            realm: 'myrealm',
            group: 'two',
          },
        },
      ],
      _path: '/myorg/myproj',
      _rev: 1,
      _createdAt: '2018-09-17T14:55:42.939Z',
      _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
      _updatedAt: '2018-09-17T15:05:42.939Z',
      _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
    },
    {
      '@id': 'https://nexus.example.com/v1/acls/myorg/myproj2',
      '@type': 'Anonymous',
      acl: [
        {
          permissions: ['read'],
          identity: {
            '@id': 'https://nexus.example.com/v1/realms/myrealm/users/me',
            '@type': 'User',
            realm: 'myrealm',
            subject: 'me',
          },
        },
      ],
      _path: '/myorg/myproj2',
      _rev: 2,
      _createdAt: '2018-09-17T14:00:42.939Z',
      _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/alice',
      _updatedAt: '2018-09-17T14:05:42.939Z',
      _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/alice',
    },
  ],
};
