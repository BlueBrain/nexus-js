import Permissions from '..';
import { mockFetchers } from '../../testUtils';
import { PermissionsPayload } from '../types';

const permissions = Permissions(mockFetchers, { uri: 'http://api.url/v1' });

describe('Permissions', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the resolvers api with the right url', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await permissions.list();
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/permissions',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet call to the resolvers api with the right url and query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await permissions.list({ rev: 1 });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/permissions?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('replace', () => {
    it('should make httpPut call to the permission api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: PermissionsPayload = {
        permissions: ['newpermission/read', 'newpermission/write'],
      };
      await permissions.replace(2, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/permissions?rev=2',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('append', () => {
    it('should make httpPut call to the permission api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: PermissionsPayload = {
        permissions: ['newpermission/create'],
      };
      await permissions.append(2, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/permissions?rev=2',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ ...payload, '@type': 'Append' }),
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PATCH');
    });
  });

  describe('subtract', () => {
    it('should make httpPut call to the permission api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: PermissionsPayload = {
        permissions: ['newpermission/write'],
      };
      await permissions.subtract(2, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/permissions?rev=2',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ ...payload, '@type': 'Subtract' }),
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PATCH');
    });
  });

  describe('delete', () => {
    it('should make httpDELETE call to the permission api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await permissions.delete(1);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/permissions?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });
});
