import { resetMocks, mockResponse, mock, mockResponses } from 'jest-fetch-mock';
import Project, { ProjectResponse } from '../index';
import {
  mockProjectResponse,
  mockViewsListResponse,
} from '../../__mocks__/helpers';
import { httpGet } from '../../utils/http';
import { getProject, listProjects, createProject } from '../utils';
import Nexus from '../../Nexus';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('Project class', () => {
  it('Should create a Project instance', () => {
    const p = new Project('my-org', mockProjectResponse);
    expect(p.id).toEqual(mockProjectResponse['@id']);
    expect(p.name).toEqual(mockProjectResponse.name);
    expect(p.base).toEqual(mockProjectResponse.base);
    expect(p.version).toEqual(mockProjectResponse._rev);
    expect(p.deprecated).toEqual(mockProjectResponse._deprecated);
    expect(p.createdAt.toISOString()).toEqual(mockProjectResponse._createdAt);
    expect(p.updatedAt.toISOString()).toEqual(mockProjectResponse._updatedAt);
  });

  describe.skip('listElasticSearchViews()', () => {
    const mockHttpGet = <jest.Mock<typeof httpGet>>httpGet;

    // Mock the elastic earch views response
    mockHttpGet.mockImplementation(async () => mockViewsListResponse);

    afterEach(() => {
      mockHttpGet.mockClear();
    });

    it('should call httpGet method with the proper get views url', () => {
      const p = new Project('my-org', mockProjectResponse);
      const myViews = p.listElasticSearchViews();
      const viewURL = `/views/${p.orgLabel}/${p.label}`;
      expect(mockHttpGet).toBeCalledWith(viewURL);
    });

    it('should return a just list of ElasticSearchViews from a response that includes multiple view types', async () => {
      const p = new Project('my-org', mockProjectResponse);
      expect.assertions(1);
      const myViews = await p.listElasticSearchViews();
      expect(myViews.length).toEqual(1);
    });
  });
  describe('get a project', () => {
    afterEach(() => {
      resetMocks();
    });
    it('set the rev option', async () => {
      getProject('myorg', 'myproject', { revision: 21 });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg/myproject?rev=21`,
      );
    });
    it('set the tag option', async () => {
      getProject('myorg', 'myproject', { tag: 'v1.0.0' });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg/myproject?tag=v1.0.0`,
      );
    });
    it('set the rev option over the tag one', async () => {
      getProject('myorg', 'myproject', { revision: 39, tag: 'v1.0.0' });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg/myproject?rev=39`,
      );
    });
  });
  // TODO: blocked by https://github.com/BlueBrain/nexus/issues/112
  describe.skip('list projects', () => {
    afterEach(() => {
      resetMocks();
    });
    it('call the /projects endpoint', async () => {
      listProjects('myorg');
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/projects/myorg`);
    });
    it('set the full text search option', async () => {
      listProjects('myorg', { q: 'what_is_this' });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg?q=what_is_this`,
      );
    });
    it('set the from option', async () => {
      listProjects('myorg', { from: 2 });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/projects/myorg?from=2`);
    });
    it('set the size option', async () => {
      listProjects('myorg', { size: 50 });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/projects/myorg?size=50`);
    });
    it('set the deprecated option', async () => {
      listProjects('myorg', { deprecated: true });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg?deprecated=true`,
      );
    });
    it('set all the options', async () => {
      listProjects('myorg', {
        d: 'query',
        from: 3,
        size: 10,
        deprecated: true,
      });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/projects/myorg?q=query&from=3&size=10&deprecated=true`,
      );
    });
  });
  describe('create a project', () => {
    afterEach(() => {
      resetMocks();
    });
    it('set the rev option', async () => {
      const projectOptions = {
        base: 'http://base.com',
        name: 'This is top secret',
        prefixMappings: [
          {
            prefix: 'name',
            namespace: 'http://schema.org/name',
          },
        ],
      };
      createProject('myorg', 'topsecret', projectOptions);
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/projects/myorg/topsecret`);
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(projectOptions));
    });
  });
});
