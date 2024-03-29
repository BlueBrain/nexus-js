import Project from '..';
import { mockFetchers } from '../../testUtils';
import { ProjectPayload } from '../types';

const project = Project(mockFetchers, { uri: 'http://api.url/v1' });

describe('Project', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the projects api with the right url', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await project.get('org', 'projectLabel');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/projects/org/projectLabel',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet call to the projects api with the right url and query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await project.get('org', 'projectLabel', { rev: 1 });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/projects/org/projectLabel?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('list', () => {
    it('should make httpGet call to the projects api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await project.list('org');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/projects/org',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet with query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await project.list('org', {
        deprecated: true,
        label: 'myProject',
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/projects/org?deprecated=true&label=myProject',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('can be listed without an org label', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await project.list();
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual('http://api.url/v1/projects');
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('create', () => {
    it('should make httpPost call to the projects api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: ProjectPayload = {
        description: 'example project creation',
        base: 'https://nexus.example.com/v1/myorg/myproject/',
        vocab: 'https://schema.org/',
        apiMappings: [
          {
            prefix: 'person',
            namespace: 'http://example.com/some/person',
          },
          {
            prefix: 'schemas',
            namespace: 'https://bluebrain.github.io/nexus/schemas/',
          },
          {
            prefix: 'ex',
            namespace: 'http://example.com/',
          },
        ],
      };
      await project.create('org', 'projectLabel', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/projects/org/projectLabel',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('update', () => {
    it('should make httpPut call to the projects api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: ProjectPayload = {
        description: 'example project creation',
        base: 'https://nexus.example.com/v1/myorg/myproject/',
        vocab: 'https://schema.org/',
        apiMappings: [
          {
            prefix: 'person',
            namespace: 'http://example.com/some/person',
          },
          {
            prefix: 'schemas',
            namespace: 'https://bluebrain.github.io/nexus/schemas/',
          },
          {
            prefix: 'ex',
            namespace: 'http://example.com/',
          },
        ],
      };
      await project.update('org', 'projectLabel', 1, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/projects/org/projectLabel?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('deprecate', () => {
    it('should make httpDELETE call to the projects api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await project.deprecate('org', 'projectLabel', 1);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/projects/org/projectLabel?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });

  describe('statistics', () => {
    it('should fetch projects statistics', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await project.statistics('orgLabel', 'projectLabel');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/projects/orgLabel/projectLabel/statistics',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('project deletion config', () => {
    it('exposes the project deletion configuration', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await project.deletionConfig();
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/project-deletion/config',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });
});
