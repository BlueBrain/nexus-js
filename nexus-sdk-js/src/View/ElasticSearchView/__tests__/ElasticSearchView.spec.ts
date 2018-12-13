import ElasticSearchView, { ElasticSearchViewResponse } from '../index';
import {
  mockElasticSearchViewResponse,
  mockElasticSearchViewQueryResponse,
  mockResourceResponse,
} from '../../../__mocks__/helpers';
import { httpPost, httpGet } from '../../../utils/http';

jest.mock('../../../utils/http');

function testClassProperties(
  view: ElasticSearchView,
  response: ElasticSearchViewResponse,
) {
  expect(view.id).toEqual(response['@id']);
  expect(view.type).toEqual(response['@type']);
  expect(view.uuid).toEqual(response._uuid);
  expect(view.mapping).toEqual(response.mapping);
  expect(view.includeMetadata).toEqual(response.includeMetadata);
  expect(view.rev).toEqual(response._rev);
  expect(view.deprecated).toEqual(response._deprecated);
}

describe('ElasticSearchView class', () => {
  const orgLabel = 'testOrg';
  const projectLabel = 'testProject';
  it('should create a ElasticSearchView instance', () => {
    const view = new ElasticSearchView(
      orgLabel,
      projectLabel,
      mockElasticSearchViewResponse,
    );
    expect(view).toBeInstanceOf(ElasticSearchView);
  });

  it('should convert a payload to class properties', () => {
    const view = new ElasticSearchView(
      orgLabel,
      projectLabel,
      mockElasticSearchViewResponse,
    );
    testClassProperties(view, mockElasticSearchViewResponse);
  });

  it('should create a queryURL from project and org labels', () => {
    const view = new ElasticSearchView(
      orgLabel,
      projectLabel,
      mockElasticSearchViewResponse,
    );
    const expectedQueryURL = `views/${orgLabel}/${projectLabel}/${
      view.id
    }/_search`;
    expect(view.queryURL).toEqual(expectedQueryURL);
  });

  describe('query()', () => {
    const mockHttpPost = <jest.Mock<typeof httpPost>>httpPost;
    const mockHttpGet = <jest.Mock<typeof httpGet>>httpGet;
    // Mock our query response
    mockHttpPost.mockImplementation(async () => {
      return mockElasticSearchViewQueryResponse;
    });

    // Mock the getResourcebyId response
    mockHttpGet.mockImplementation(async () => {
      return mockResourceResponse;
    });

    afterEach(() => {
      mockHttpPost.mockClear();
      mockHttpGet.mockClear();
    });
    it('should call httpPost method with the query object and URL', () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const myQuery = {};
      view.query(myQuery);
      expect(mockHttpPost).toBeCalledWith(view.queryURL, myQuery);
      mockHttpPost.mockClear();
    });

    it('should be able to make query with <PaginationSettings>', () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const myQuery = {};
      const myPaginationSettings = {
        from: 2,
        size: 20,
      };
      view.query(myQuery, myPaginationSettings);
      const expectedQueryURL = `views/${orgLabel}/${projectLabel}/${
        view.id
      }/_search?from=${myPaginationSettings.from}&size=${
        myPaginationSettings.size
      }`;
      expect(mockHttpPost).toBeCalledWith(expectedQueryURL, myQuery);
      mockHttpPost.mockClear();
    });

    it('should return Promise<PaginatedList<Resource>>', async () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const myQuery = {};
      expect.assertions(2);
      const data = await view.query(myQuery);
      expect(data).toHaveProperty('total', 3341);
      expect(data).toHaveProperty('results');
      mockHttpPost.mockClear();
      mockHttpPost.mockClear();
    });
  });
});
