import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Nexus from '../../Nexus';
import { mockListRealmResponse } from '../__mocks__/mockReponses';
import makeRealmUtils from '../utils';
import store from '../../store';

const { fetchMock } = <GlobalWithFetchMock>global;

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);
const {
  create: createRealm,
  get: getRealm,
  list: listRealms,
  deprecate: deprecateRealm,
  update: updateRealm,
} = makeRealmUtils(store);

describe('Realm utils', () => {
  describe('getRealm()', () => {
    beforeEach(() => {
      fetchMock.mockResponse('{}');
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should make a GET request using the realmLabel', async () => {
      await getRealm('myrealm');
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm`);
    });
    it('should make a GET request using the realmLabel and specific rev', async () => {
      await getRealm('myrealm', 12);
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
      await listRealms();
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/realms?from=0&size=20`,
      );
    });
    it('should make a GET request with the deprecated option', async () => {
      await listRealms({ deprecated: true });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/realms?deprecated=true`,
      );
    });
    it('should make a GET request with the size option', async () => {
      await listRealms({ size: 100 });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/realms?size=100`);
    });
    it('should make a GET request with the size option', async () => {
      await listRealms({ from: 3 });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/realms?from=3`);
    });
    it('should make a GET request with all options', async () => {
      await listRealms({ from: 3, size: 10, deprecated: true });
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
      await createRealm('myrealm', {
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
      await createRealm('myrealm', {
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
      await updateRealm('myrealm', 2, {
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
      await deprecateRealm('myrealm', 2);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/realms/myrealm?rev=2`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });
});
