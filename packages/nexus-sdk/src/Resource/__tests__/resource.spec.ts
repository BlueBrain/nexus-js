import Resource from '..';
import { mockFetchers } from '../../testUtils';

const resource = Resource(mockFetchers, { uri: 'http://api.url/v1' });

describe('Resource', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the resources api with the right url', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resource.get('org', 'project', 'myId');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resources/org/project/_/myId',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet call to the resources api with the right url and query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resource.get('org', 'project', 'myId', {
        rev: 1,
        q: 'myTextString',
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resources/org/project/_/myId?rev=1&q=myTextString',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('list', () => {
    it('should make httpGet call to the resources api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resource.list('org', 'project');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resources/org/project',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet with query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resource.list('org', 'project', {
        createdBy: 'me',
        type: 'View',
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resources/org/project?createdBy=me&type=View',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('create', () => {
    it('should make httpPost call to the resources api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        '@id': 'myResource',
        '@context': 'something',
        something: 'hello!',
      };
      await resource.create('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resources/org/project',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });

  describe('update', () => {
    it('should make httpPut call to the resources api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        '@id': 'myResource',
        '@context': 'something',
        something: 'hello!',
      };
      await resource.update('org', 'project', 'myResourceId', 1, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resources/org/project/_/myResourceId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('tag', () => {
    it('should make httpPost call to the resources api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        rev: 1,
        tag: 'whatever',
      };
      await resource.tag('org', 'project', 'myResourceId', 1, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resources/org/project/myResourceId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });

  describe('deprecate', () => {
    it('should make httpDELETE call to the resources api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resource.deprecate('org', 'project', 'myResourceId', 1);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resources/org/project/_/myResourceId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });

  describe('poll', () => {
    it('should make httpGet call to the resources api', () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      resource
        .poll('org', 'project', 'myViewId', { pollIntervalMs: 50 })
        .subscribe(value => {
          expect(fetchMock.mock.calls.length).toEqual(1);
          expect(fetchMock.mock.calls[0][0]).toEqual(
            'http://api.url/v1/resources/org/project/myViewId',
          );
          expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
        });
    });
  });
});
