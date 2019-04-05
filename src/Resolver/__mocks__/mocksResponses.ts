export const mockListResolverResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/search.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  _total: 2,
  _results: [
    {
      '@id': 'https://bluebrain.github.io/nexus/vocabulary/defaultInProject',
      '@type': [
        'https://bluebrain.github.io/nexus/vocabulary/Resolver',
        'https://bluebrain.github.io/nexus/vocabulary/InProject',
      ],
      _self:
        'http://api.url/v1/resolvers/myorg/myproject/https%3A%2F%2Fbluebrain.github.io%2Fnexus%2Fvocabulary%2FdefaultInProject',
      _constrainedBy: 'https://bluebrain.github.io/nexus/schemas/resolver.json',
      _project: 'http://api.url/v1/projects/myorg/myproject',
      _rev: 1,
      _deprecated: false,
      _createdAt: '2019-04-04T13:23:09.187Z',
      _createdBy: 'http://api.url/v1/realms/github-dev/users/bbp-test',
      _updatedAt: '2019-04-04T13:23:09.187Z',
      _updatedBy: 'http://api.url/v1/realms/github-dev/users/bbp-test',
    },
    {
      '@id':
        'http://api.url/v1/resources/myorg/myproject/_/crossprojectresolver1',
      '@type': [
        'https://bluebrain.github.io/nexus/vocabulary/CrossProject',
        'https://bluebrain.github.io/nexus/vocabulary/Resolver',
      ],
      _self:
        'http://api.url/v1/resolvers/myorg/myproject/crossprojectresolver1',
      _constrainedBy: 'https://bluebrain.github.io/nexus/schemas/resolver.json',
      _project: 'http://api.url/v1/projects/myorg/myproject',
      _rev: 1,
      _deprecated: false,
      _createdAt: '2019-04-04T14:46:15.835Z',
      _createdBy: 'http://api.url/v1/realms/github-dev/users/bbp-test',
      _updatedAt: '2019-04-04T14:46:15.835Z',
      _updatedBy: 'http://api.url/v1/realms/github-dev/users/bbp-test',
    },
  ],
};

export const mockGetInProjectResolverResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/resolver.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  '@id': 'nxv:defaultInProject',
  '@type': ['Resolver', 'InProject'],
  priority: 1,
  _self: 'http://api.url/v1/resolvers/myorg/myproject/defaultResolver',
  _constrainedBy: 'https://bluebrain.github.io/nexus/schemas/resolver.json',
  _project: 'http://api.url/v1/projects/myorg/myproject',
  _rev: 1,
  _deprecated: false,
  _createdAt: '2019-04-04T13:23:09.187Z',
  _createdBy: 'http://api.url/v1/realms/github-dev/users/bbp-test',
  _updatedAt: '2019-04-04T13:23:09.187Z',
  _updatedBy: 'http://api.url/v1/realms/github-dev/users/bbp-test',
};

export const mockGetCrossProjectResolverResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/resolver.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  '@id': 'http://api.url/v1/resources/myorg/myproject/_/crossprojectresolver1',
  '@type': ['CrossProject', 'Resolver'],
  identities: [{ '@type': 'Anonymous' }],
  priority: 1,
  projects: ['myorg/myotherproject'],
  _self: 'http://api.url/v1/resolvers/myorg/myproject/crossprojectresolver1',
  _constrainedBy: 'https://bluebrain.github.io/nexus/schemas/resolver.json',
  _project: 'http://api.url/v1/projects/myorg/myproject',
  _rev: 1,
  _deprecated: false,
  _createdAt: '2019-04-05T09:42:18.053Z',
  _createdBy:
    'http://api.url/v1/realms/github-dev/users/bbp-test',
  _updatedAt: '2019-04-05T09:42:18.053Z',
  _updatedBy:
    'http://api.url/v1/realms/github-dev/users/bbp-test',
};
