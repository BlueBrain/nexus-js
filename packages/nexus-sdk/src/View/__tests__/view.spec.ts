import View from '..';
import { mockFetchers } from '../../testUtils';

const view = View(mockFetchers, { uri: 'http://api.url/v1' });

describe('Views', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the views api with the right url and a header', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await view.get('org', 'project', 'myId');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project/myId',
      );
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        Accept: 'application/ld+json',
      });
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet call to the views api with the right url and query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await view.get('org', 'project', 'myId', { rev: 1 });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project/myId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet call with the right header', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await view.get('org', 'project', 'myId', { rev: 1, as: 'n-triples' });
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        Accept: 'application/n-triples',
      });
    });
  });

  describe('list', () => {
    it('should make httpGet call to the views api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await view.list('org', 'project');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet with query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await view.list('org', 'project', {
        createdBy: 'me',
        type: 'ElasticSearchView',
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project?createdBy=me&type=ElasticSearchView',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('create', () => {
    it('should make httpPost call to the views api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        '@id': 'https://bluebrain.github.io/nexus/vocabulary/myview',
        '@type': ['ElasticSearchView'] as ['ElasticSearchView'],
        mapping: {
          dynamic: false,
          properties: {
            '@id': {
              type: 'keyword',
            },
            '@type': {
              type: 'keyword',
            },
            name: {
              type: 'keyword',
            },
            number: {
              type: 'long',
            },
            bool: {
              type: 'boolean',
            },
          },
        },
        includeMetadata: false,
        sourceAsText: false,
        resourceSchemas: 'https://bluebrain.github.io/nexus/schemas/myschema',
      };
      await view.create('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });

  describe('update', () => {
    it('should make httpPut call to the views api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        '@id': 'https://bluebrain.github.io/nexus/vocabulary/myview',
        '@type': ['ElasticSearchView'] as ['ElasticSearchView'],
        mapping: {
          dynamic: false,
          properties: {
            '@id': {
              type: 'keyword',
            },
            '@type': {
              type: 'keyword',
            },
            name: {
              type: 'keyword',
            },
            number: {
              type: 'long',
            },
            bool: {
              type: 'boolean',
            },
          },
        },
        includeMetadata: false,
        sourceAsText: false,
        resourceSchemas: 'https://bluebrain.github.io/nexus/schemas/myschema',
      };
      await view.update('org', 'project', 'myViewId', 1, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project/myViewId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('tag', () => {
    it('should make httpPost call to the views api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        rev: 1,
        tag: 'whatever',
      };
      await view.tag('org', 'project', 'myViewId', 1, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project/myViewId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });

  describe('deprecate', () => {
    it('should make httpDELETE call to the views api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await view.deprecate('org', 'project', 'myViewId', 1);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project/myViewId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });

  describe('elasticSearchQuery', () => {
    it('should make httpPost call to the views query api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        query: {
          term: {
            _deprecated: true,
          },
        },
      };
      await view.elasticSearchQuery('org', 'project', 'myId', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project/myId/_search',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });

  describe('sparqlQuery', () => {
    it('should make httpPost call to the views query api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = 'SELECT ?s ?p ?o WHERE {?s ?p ?o} LIMIT 20';
      await view.sparqlQuery('org', 'project', 'myId', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project/myId/sparql',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(payload);
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        'Content-Type': 'text/plain',
      });
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });

  describe('statistics', () => {
    it('should make httpGet call to the views api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await view.statistics('org', 'project', 'myViewId');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project/myViewId/statistics',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });
});
