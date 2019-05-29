import View from '..';
import { mockFetchers } from '../../testUtils';
import { ElasticSearchViewPayload } from '../types';

const view = View(mockFetchers, { uri: 'http://api.url/v1' });

describe('Views', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the views api with the right url', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await view.get('org', 'project', 'myId');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project/myId',
      );
    });

    it('should make httpGet call to the views api with the right url and query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await view.get('org', 'project', 'myId', { rev: 1 });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/views/org/project/myId?rev=1',
      );
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
    });
  });

  describe('create', () => {
    it('should make httpPut call to the views api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: ElasticSearchViewPayload = {
        '@id': 'https://bluebrain.github.io/nexus/vocabulary/myview',
        '@type': ['ElasticSearchView'],
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
    });
  });
});
