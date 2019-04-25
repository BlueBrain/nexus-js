import { Realm } from '../../../lib';
import { GlobalWithFetchMock } from 'jest-fetch-mock';

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

const { fetchMock } = <GlobalWithFetchMock>global;

const baseUrl = 'null';

describe('Realm utils', () => {
  describe('getRealm()', () => {
    beforeEach(() => {
      fetchMock.mockResponse('{}');
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should make a GET request using the realmLabel', async () => {
      await Realm.get('myrealm');
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm`);
    });
    it('should make a GET request using the realmLabel and specific rev', async () => {
      await Realm.get('myrealm', 12);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/realms/myrealm?rev=12`,
      );
    });
  });

  describe('listRealms()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockListRealmResponse));
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should make a GET request with the default options', async () => {
      await Realm.list();
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/realms?from=0&size=20`,
      );
    });
    it('should make a GET request with the deprecated option', async () => {
      await Realm.list({ deprecated: true });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/realms?deprecated=true`,
      );
    });
    it('should make a GET request with the size option', async () => {
      await Realm.list({ size: 100 });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/realms?size=100`);
    });
    it('should make a GET request with the size option', async () => {
      await Realm.list({ from: 3 });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/realms?from=3`);
    });
    it('should make a GET request with all options', async () => {
      await Realm.list({ from: 3, size: 10, deprecated: true });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/realms?from=3&size=10&deprecated=true`,
      );
    });
  });

  describe('createRealm()', () => {
    beforeEach(() => {
      fetchMock.mockResponse('{}');
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should make a PUT request using the realmLabel and the required body', async () => {
      await Realm.create('myrealm', {
        name: 'GITHUB',
        openIdConfig: 'http://config.com',
      });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm`);
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({
          name: 'GITHUB',
          openIdConfig: 'http://config.com',
        }),
      );
    });
    it('should make a PUT request using the realmLabel and all options', async () => {
      await Realm.create('myrealm', {
        name: 'GITHUB',
        openIdConfig: 'http://config.com',
        logo: 'github.png',
      });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm`);
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({
          name: 'GITHUB',
          openIdConfig: 'http://config.com',
          logo: 'github.png',
        }),
      );
    });
  });

  describe('updateRealm()', () => {
    beforeEach(() => {
      fetchMock.mockResponse('{}');
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should make a PUT request using the realmLabel and version and the required body', async () => {
      await Realm.update('myrealm', 2, {
        name: 'GITHUB',
        openIdConfig: 'http://config.com',
      });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/realms/myrealm?rev=2`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({
          name: 'GITHUB',
          openIdConfig: 'http://config.com',
        }),
      );
    });
  });

  describe('deprecateRealm()', () => {
    beforeEach(() => {
      fetchMock.mockResponse('{}');
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should make a DELETE request using the realmLabel and version', async () => {
      await Realm.deprecate('myrealm', 2);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/realms/myrealm?rev=2`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });
});
