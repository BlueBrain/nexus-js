import { resetMocks, mock, mockResponse } from 'jest-fetch-mock';
import Realm from '../index';
import Nexus from '../../Nexus';
import { getRealm } from '../utils';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('Realm utils', () => {
  beforeEach(() => {
    mockResponse('{}');
  });

  afterEach(() => {
    resetMocks();
  });

  describe('getRealm()', () => {
    it('should make a GET request using the realmLabel and rev=1', async () => {
      await getRealm('myrealm');
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm?rev=1`);
    });
    it('should make a GET request using the realmLabel and specific rev', async () => {
      await getRealm('myrealm', 12);
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/realms/myrealm?rev=12`);
    });
  });
});
