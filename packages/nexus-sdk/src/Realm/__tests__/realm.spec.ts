import Realm from '..';
import { mockFetchers } from '../../testUtils';
import { RealmPayload } from '../types';

const realm = Realm(mockFetchers, { uri: 'http://api.url/v1' });

describe('Realm', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the realms api with the right url', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await realm.get('realmLabel');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/realms/realmLabel',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet call to the realms api with the right url and query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await realm.get('realmLabel', { rev: 1 });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/realms/realmLabel?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('list', () => {
    it('should make httpGet call to the realms api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await realm.list();
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual('http://api.url/v1/realms');
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet with query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await realm.list({
        deprecated: true,
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/realms?deprecated=true',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('create', () => {
    it('should make httpPost call to the realms api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: RealmPayload = {
        name: 'Nexus Dev',
        openIdConfig:
          'https://nexus.example.com/auth/realms/bbp-test/.well-known/openid-configuration',
        logo: 'http://nexus.example.com/logo.png',
      };
      await realm.create('realmLabel', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/realms/realmLabel',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('update', () => {
    it('should make httpPut call to the realms api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: RealmPayload = {
        name: 'Nexus Dev',
        openIdConfig:
          'https://nexus.example.com/auth/realms/bbp-test/.well-known/openid-configuration',
        logo: 'http://nexus.example.com/logo.png',
      };
      await realm.update('realmLabel', 1, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/realms/realmLabel?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('deprecate', () => {
    it('should make httpDELETE call to the realms api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await realm.deprecate('realmLabel', 1);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/realms/realmLabel?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });
});
