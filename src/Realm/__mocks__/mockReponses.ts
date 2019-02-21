export const mockRealmResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/iam.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  '@id': 'http://api.endpoint/v1/realms/nexusdev',
  '@type': 'Realm',
  name: 'Nexus Dev',
  openIdConfig:
    'http://api.endpoint/auth/realms/bbp-test/.well-known/openid-configuration',
  _label: 'nexusdev',
  _grantTypes: [
    'password',
    'clientCredentials',
    'refreshToken',
    'authorizationCode',
    'implicit',
  ],
  _issuer: 'http://api.endpoint/auth/realms/bbp-test',
  _authorizationEndpoint:
    'http://api.endpoint/auth/realms/bbp-test/protocol/openid-connect/auth',
  _tokenEndpoint:
    'http://api.endpoint/auth/realms/bbp-test/protocol/openid-connect/token',
  _userInfoEndpoint:
    'http://api.endpoint/auth/realms/bbp-test/protocol/openid-connect/userinfo',
  _endSessionEndpoint:
    'http://api.endpoint/auth/realms/bbp-test/protocol/openid-connect/logout',
  _rev: 1,
  _deprecated: false,
  _createdAt: '2019-01-16T16:14:08.414Z',
  _createdBy: 'http://api.endpoint/v1/anonymous',
  _updatedAt: '2019-01-16T16:14:08.414Z',
  _updatedBy: 'http://api.endpoint/v1/anonymous',
};
export const mockListRealmResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/resource.json',
    'https://bluebrain.github.io/nexus/contexts/iam.json',
    'https://bluebrain.github.io/nexus/contexts/search.json',
  ],
  _total: 2,
  _results: [
    {
      '@id': 'http://api.endpoint/v1/realms/nexusdev',
      '@type': 'Realm',
      name: 'Nexus Dev',
      openIdConfig:
        'http://api.endpoint/auth/realms/bbp-test/.well-known/openid-configuration',
      _label: 'nexusdev',
      _grantTypes: [
        'password',
        'clientCredentials',
        'refreshToken',
        'authorizationCode',
        'implicit',
      ],
      _issuer: 'http://api.endpoint/auth/realms/bbp-test',
      _authorizationEndpoint:
        'http://api.endpoint/auth/realms/bbp-test/protocol/openid-connect/auth',
      _tokenEndpoint:
        'http://api.endpoint/auth/realms/bbp-test/protocol/openid-connect/token',
      _userInfoEndpoint:
        'http://api.endpoint/auth/realms/bbp-test/protocol/openid-connect/userinfo',
      _endSessionEndpoint:
        'http://api.endpoint/auth/realms/bbp-test/protocol/openid-connect/logout',
      _rev: 1,
      _deprecated: false,
      _createdAt: '2019-01-16T16:14:08.414Z',
      _createdBy: 'http://api.endpoint/v1/anonymous',
      _updatedAt: '2019-01-16T16:14:08.414Z',
      _updatedBy: 'http://api.endpoint/v1/anonymous',
    },
    {
      '@id': 'http://api.endpoint/v1/realms/github',
      '@type': 'Realm',
      name: 'Github Dev',
      openIdConfig:
        'http://another.endpoint/auth/realms/github-dev/.well-known/openid-configuration',
      _label: 'github',
      _grantTypes: [
        'password',
        'clientCredentials',
        'refreshToken',
        'authorizationCode',
        'implicit',
      ],
      _issuer: 'http://another.endpoint/auth/realms/github-dev',
      _authorizationEndpoint:
        'http://another.endpoint/auth/realms/github-dev/protocol/openid-connect/auth',
      _tokenEndpoint:
        'http://another.endpoint/auth/realms/github-dev/protocol/openid-connect/token',
      _userInfoEndpoint:
        'http://another.endpoint/auth/realms/github-dev/protocol/openid-connect/userinfo',
      _endSessionEndpoint:
        'http://another.endpoint/auth/realms/github-dev/protocol/openid-connect/logout',
      _rev: 1,
      _deprecated: false,
      _createdAt: '2019-01-16T16:16:09.294Z',
      _createdBy: 'http://api.endpoint/v1/anonymous',
      _updatedAt: '2019-01-16T16:16:09.294Z',
      _updatedBy: 'http://api.endpoint/v1/anonymous',
    },
  ],
};
