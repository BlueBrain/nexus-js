import { resetMocks, mockResponse, mock, mockResponses } from 'jest-fetch-mock';
import Project, { ProjectResponse } from '../index';
import {
  mockProjectResponse,
  mockViewsListResponse,
} from '../../__mocks__/helpers';
import { httpGet } from '../../utils/http';
import { getProject } from '../utils';
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
  describe('get an project', () => {
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
});
