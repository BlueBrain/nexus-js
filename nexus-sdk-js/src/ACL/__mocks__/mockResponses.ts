import { ACLResponse, ListACLResponse } from '../types';

export const mockACLResponse: ACLResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/resource.json',
    'https://bluebrain.github.io/nexus/contexts/acls.json',
  ],
  '@id': 'https://nexus.example.com/v1/acls/org1',
  '@type': 'User',
  _path: '/org1',
  acl: [
    {
      permissions: ['read'],
      identity: {
        '@id': 'https://nexus.example.com/v1/realms/myrealm/groups/a-group',
        '@type': 'Group',
        realm: 'myrealm',
        group: 'a-group',
      },
    },
    {
      permissions: ['read', 'write'],
      identity: {
        '@id': 'https://nexus.example.com/v1/realms/myrealm/groups/some-group',
        '@type': 'Group',
        realm: 'myrealm',
        group: 'some-group',
      },
    },
    {
      permissions: ['acls/read', 'acls/write'],
      identity: {
        '@id': 'https://nexus.example.com/v1/realms/myrealm/users/user',
        '@type': 'User',
        realm: 'myrealm',
        subject: 'alice',
      },
    },
  ],
  _createdAt: '2018-09-18T09:58:00.801Z',
  _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _updatedAt: '2018-09-18T10:01:00.801Z',
  _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _rev: 1,
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
