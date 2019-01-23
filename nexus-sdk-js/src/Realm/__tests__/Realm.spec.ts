import { resetMocks, mock, mockResponse } from 'jest-fetch-mock';
import Realm from '../index';
import Nexus from '../../Nexus';
import { getRealm, listRealms } from '../utils';
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
});
