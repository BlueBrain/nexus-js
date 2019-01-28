import { resetMocks, mock, mockResponse } from 'jest-fetch-mock';
import Nexus from '../../Nexus';
import {
  getRealm,
  listRealms,
  createRealm,
  updateRealm,
  deprecateRealm,
} from '../utils';
import { mockListRealmResponse } from '../__mocks__/mockReponses';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('Realm utils', () => {
  describe('getRealm()', () => {
    beforeEach(() => {
      mockResponse('{}');
    });

    afterEach(() => {
      resetMocks();
    });

    it('should make a GET request using the realmLabel and rev=1', async () => {
      await getRealm('myrealm');
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm?rev=1`);
    });
    it('should make a GET request using the realmLabel and specific rev', async () => {
      await getRealm('myrealm', 12);
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm?rev=12`);
    });
  });

  describe('listRealms()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockListRealmResponse));
    });

    afterEach(() => {
      resetMocks();
    });

    it('should make a GET request with the default options', async () => {
      await listRealms();
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms?from=0&size=20`);
    });
    it('should make a GET request with the deprecated option', async () => {
      await listRealms({ deprecated: true });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms?deprecated=true`);
    });
    it('should make a GET request with the size option', async () => {
      await listRealms({ size: 100 });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms?size=100`);
    });
    it('should make a GET request with the size option', async () => {
      await listRealms({ from: 3 });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms?from=3`);
    });
    it('should make a GET request with all options', async () => {
      await listRealms({ from: 3, size: 10, deprecated: true });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/realms?from=3&size=10&deprecated=true`,
      );
    });
  });

  describe('createRealm()', () => {
    beforeEach(() => {
      mockResponse('{}');
    });

    afterEach(() => {
      resetMocks();
    });

    it('should make a PUT request using the realmLabel and the required body', async () => {
      await createRealm('myrealm', {
        name: 'GITHUB',
        openIdConfig: 'http://config.com',
      });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm`);
      expect(mock.calls[0][1].method).toEqual('PUT');
      expect(mock.calls[0][1].body).toEqual(
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
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm`);
      expect(mock.calls[0][1].method).toEqual('PUT');
      expect(mock.calls[0][1].body).toEqual(
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
      mockResponse('{}');
    });

    afterEach(() => {
      resetMocks();
    });

    it('should make a PUT request using the realmLabel and version and the required body', async () => {
      await updateRealm('myrealm', 2, {
        name: 'GITHUB',
        openIdConfig: 'http://config.com',
      });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm?rev=2`);
      expect(mock.calls[0][1].method).toEqual('PUT');
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify({
          name: 'GITHUB',
          openIdConfig: 'http://config.com',
        }),
      );
    });
  });

  describe('deprecateRealm()', () => {
    beforeEach(() => {
      mockResponse('{}');
    });

    afterEach(() => {
      resetMocks();
    });

    it('should make a DELETE request using the realmLabel and version', async () => {
      await deprecateRealm('myrealm', 2);
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm?rev=2`);
      expect(mock.calls[0][1].method).toEqual('DELETE');
    });
  });
});
