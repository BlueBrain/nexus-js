import ACL from '..';
import { mockFetchers } from '../../testUtils';
import { ACLPayload } from '../types';

const acl = ACL(mockFetchers, { uri: 'http://api.url/v1' });

describe('Views', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('list', () => {
    it('should make httpGet call to the acl api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await acl.list('org/project');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/acls/org/project',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet with query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await acl.list('/org/project', {
        ancestors: true,
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/acls/org/project?ancestors=true',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('create', () => {
    it('should make httpPost call to the acl api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: ACLPayload = {
        acl: [
          {
            permissions: ['projects/read'],
            identity: {
              realm: 'myrealm',
              group: 'a-group',
            },
          },
          {
            permissions: ['projects/read', 'projects/write'],
            identity: {
              realm: 'realm',
              group: 'some-group',
            },
          },
          {
            permissions: ['acls/read', 'acls/write'],
            identity: {
              realm: 'realm',
              subject: 'alice',
            },
          },
        ],
      };
      await acl.create('org/project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/acls/org/project',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('replace', () => {
    it('should make httpPut call to the acl api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: ACLPayload = {
        acl: [
          {
            permissions: ['projects/read'],
            identity: {
              realm: 'myrealm',
              group: 'a-group',
            },
          },
          {
            permissions: ['projects/read', 'projects/write'],
            identity: {
              realm: 'realm',
              group: 'some-group',
            },
          },
          {
            permissions: ['acls/read', 'acls/write'],
            identity: {
              realm: 'realm',
              subject: 'alice',
            },
          },
        ],
      };
      await acl.replace('*', 2, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/acls/*?rev=2',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('append', () => {
    it('should make httpPut call to the acl api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: ACLPayload = {
        acl: [
          {
            permissions: ['own', 'other'],
            identity: {
              realm: 'myrealm',
              group: 'a-group',
            },
          },
        ],
      };
      await acl.append('*', 2, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/acls/*?rev=2',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ ...payload, '@type': 'Append' }),
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PATCH');
    });
  });

  describe('subtract', () => {
    it('should make httpPut call to the acl api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: ACLPayload = {
        acl: [
          {
            permissions: ['projects/read'],
            identity: {
              group: 'a-group',
              realm: 'myrealm',
            },
          },
        ],
      };
      await acl.subtract('*', 2, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/acls/*?rev=2',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ ...payload, '@type': 'Subtract' }),
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PATCH');
    });
  });

  describe('delete', () => {
    it('should make httpDELETE call to the acl api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await acl.delete('/org/project', 1);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/acls/org/project?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });
});
