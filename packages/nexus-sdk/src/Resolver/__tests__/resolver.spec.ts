import Resolver from '..';
import { mockFetchers } from '../../testUtils';
import { InProjectResolverPayload } from '../types';

const resolver = Resolver(mockFetchers, { uri: 'http://api.url/v1' });

describe('Resolver', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the resolvers api with the right url', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resolver.get('org', 'project', 'myId');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resolvers/org/project/myId',
      );
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        Accept: 'application/ld+json',
      });
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet call to the resolvers api with the right header', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resolver.get('org', 'project', 'myId', { as: 'vnd.graph-viz' });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        Accept: 'text/vnd.graphviz',
      });
    });

    it('should make httpGet call to the resolvers api with the right url and query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resolver.get('org', 'project', 'myId', { rev: 1 });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resolvers/org/project/myId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should call httpGet with the correct parseAs context property', async () => {
      const mockHttpGet = jest.fn();

      const resolver = Resolver(
        {
          ...mockFetchers,
          httpGet: mockHttpGet,
        },
        {
          uri: 'http://api.url/v1',
        },
      );

      await resolver.get('org', 'project', 'myId', { as: 'json' });
      await resolver.get('org', 'project', 'myId', { as: 'n-triples' });
      await resolver.get('org', 'project', 'myId', { as: 'vnd.graph-viz' });
      expect(mockHttpGet.mock.calls[0][0].context).toHaveProperty(
        'parseAs',
        'json',
      );
      expect(mockHttpGet.mock.calls[1][0].context).toHaveProperty(
        'parseAs',
        'text',
      );
      expect(mockHttpGet.mock.calls[2][0].context).toHaveProperty(
        'parseAs',
        'text',
      );
    });
  });

  describe('list', () => {
    it('should make httpGet call to the resolvers api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resolver.list('org', 'project');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resolvers/org/project',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet with query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resolver.list('org', 'project', {
        createdBy: 'me',
        type: 'InProject',
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resolvers/org/project?createdBy=me&type=InProject',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('create', () => {
    it('should make httpPost call to the resolvers api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: InProjectResolverPayload = {
        '@id': 'blahblah',
        '@type': ['InProject'],
        priority: 50,
      };
      await resolver.create('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resolvers/org/project?indexing=sync',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });

  describe('update', () => {
    it('should make httpPut call to the resolvers api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: InProjectResolverPayload = {
        '@id': 'blahblah',
        '@type': ['InProject'],
        priority: 50,
      };
      await resolver.update('org', 'project', 'myResolverId', 1, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resolvers/org/project/myResolverId?indexing=sync&rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('tag', () => {
    it('should make httpPost call to the resolvers api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        rev: 1,
        tag: 'whatever',
      };
      await resolver.tag('org', 'project', 'myId', 1, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resolvers/org/project/myId?indexing=sync&rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });

  describe('deprecate', () => {
    it('should make httpDELETE call to the resolvers api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resolver.deprecate('org', 'project', 'myId', 1);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resolvers/org/project/myId?indexing=sync&rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });

  describe('getResource', () => {
    it('should make httpGet call to the resolvers api with the right url', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await resolver.getResource('org', 'project', 'resolverId', 'resourceId');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/resolvers/org/project/resolverId/resourceId',
      );
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        Accept: 'application/ld+json',
      });
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });
});
