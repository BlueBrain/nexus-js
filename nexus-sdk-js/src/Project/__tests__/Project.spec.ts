import Project, { ProjectResponse } from '../index';
import {
  mockProjectResponse,
  mockViewsListResponse,
} from '../../__mocks__/helpers';
import { httpGet } from '../../utils/http';

jest.mock('../../utils/http');

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

  describe('getElasticSearchViews()', () => {
    const mockHttpGet = <jest.Mock<typeof httpGet>>httpGet;

    // Mock the elastic earch views response
    mockHttpGet.mockImplementation(async () => mockViewsListResponse);

    afterEach(() => {
      mockHttpGet.mockClear();
    });

    it('should call httpGet method with the proper get views url', () => {
      const p = new Project('my-org', mockProjectResponse);
      const myViews = p.getElasticSearchViews();
      const viewURL = `views/${p.orgLabel}/${p.label}`;
      expect(mockHttpGet).toBeCalledWith(viewURL);
    });

    it('should return a just list of ElasticSearchViews from a response that includes multiple view types', async () => {
      const p = new Project('my-org', mockProjectResponse);
      expect.assertions(1);
      const myViews = await p.getElasticSearchViews();
      expect(myViews.length).toEqual(1);
    });
  });
});
