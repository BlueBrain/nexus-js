import ElasticSearchView, { ElasticSearchViewResponse } from '../../ElasticSearchView';
import {
  mockElasticSearchViewResponse,
  mockElasticSearchViewQueryResponse,
  mockElasticSearchViewAggregationResponse,
} from '../../../__mocks__/helpers';
import {
  resetMocks,
  mockResponse,
  mock,
  mockResponses,
  mockReject,
} from 'jest-fetch-mock';
import Nexus from '../../../Nexus';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

function testClassProperties(
  view: ElasticSearchView,
  response: ElasticSearchViewResponse,
) {
  expect(view.id).toEqual(response['@id']);
  expect(view.type).toEqual(response['@type']);
  expect(view.uuid).toEqual(response._uuid);
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
    const expectedQueryURL = `/views/${orgLabel}/${projectLabel}/${
      view.id
    }/_search`;
    expect(view.queryURL).toEqual(expectedQueryURL);
  });

  describe('query()', () => {
    afterEach(() => resetMocks());

    it('should call httpPost method with the query object and URL', async () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const myQuery = {};
      mockResponses(
        [JSON.stringify(mockElasticSearchViewQueryResponse)],
        [JSON.stringify(mockElasticSearchViewAggregationResponse)],
      );
      await view.query(myQuery);
      expect(mock.calls[0][0]).toEqual(baseUrl + view.queryURL);
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(myQuery));
    });

    it('should throw an error if httpPost crashes', async () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const myQuery = {};
      mockReject(new Error('very bad'));

      await expect(view.query(myQuery)).rejects.toThrow(Error);
    });

    it('should be able to make query with <PaginationSettings>', async () => {
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
      mockResponses(
        [JSON.stringify(mockElasticSearchViewQueryResponse)],
        [JSON.stringify(mockElasticSearchViewAggregationResponse)],
      );
      await view.query(myQuery, myPaginationSettings);
      const expectedQueryURL = `/views/${orgLabel}/${projectLabel}/${
        view.id
      }/_search?from=${myPaginationSettings.from}&size=${
        myPaginationSettings.size
      }`;
      expect(mock.calls[0][0]).toEqual(baseUrl + expectedQueryURL);
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(myQuery));
    });

    it('should return Promise<PaginatedList<Resource>>', async () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const myQuery = {};
      mockResponses(
        [JSON.stringify(mockElasticSearchViewQueryResponse)],
        [JSON.stringify(mockElasticSearchViewAggregationResponse)],
      );
      const data = await view.query(myQuery);
      expect(data).toHaveProperty('total', 3341);
      expect(data).toHaveProperty('results');
    });
  });

  describe('rawQuery()', () => {
    afterEach(() => resetMocks());

    it('should call httpPost method with the query object and URL', async () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const myQuery = {};
      mockResponses(
        [JSON.stringify(mockElasticSearchViewQueryResponse)],
        [JSON.stringify(mockElasticSearchViewAggregationResponse)],
      );
      await view.rawQuery(myQuery);
      expect(mock.calls[0][0]).toEqual(baseUrl + view.queryURL);
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(myQuery));
    });

    it('should throw an error if httpPost crashes', async () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const myQuery = {};
      mockReject(new Error('very bad'));

      await expect(view.rawQuery(myQuery)).rejects.toThrow(Error);
    });

    it('should be able to make query with <PaginationSettings>', async () => {
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
      mockResponses(
        [JSON.stringify(mockElasticSearchViewQueryResponse)],
        [JSON.stringify(mockElasticSearchViewAggregationResponse)],
      );
      await view.rawQuery(myQuery, myPaginationSettings);
      const expectedQueryURL = `/views/${orgLabel}/${projectLabel}/${
        view.id
      }/_search?from=${myPaginationSettings.from}&size=${
        myPaginationSettings.size
      }`;
      expect(mock.calls[0][0]).toEqual(baseUrl + expectedQueryURL);
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(myQuery));
    });

    it('should return Promise<PaginatedList<ElasticSearchHit>>', async () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const myQuery = {};
      mockResponses(
        [JSON.stringify(mockElasticSearchViewQueryResponse)],
        [JSON.stringify(mockElasticSearchViewAggregationResponse)],
      );
      const data = await view.rawQuery(myQuery);
      expect(data).toHaveProperty('total', 3341);
      expect(data).toHaveProperty('results');
    });
  });

  describe('aggregation()', () => {
    const mockAggregationQuery = {
      aggs: {
        schemas: {
          terms: { field: '_constrainedBy' },
        },
      },
    };
    beforeEach(() => {
      // Mock our query response
      mockResponse(JSON.stringify(mockElasticSearchViewAggregationResponse), {
        status: 200,
      });
    });

    afterEach(() => resetMocks());
    it('should call httpPost method with the query object and URL', async () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      await view.aggregation(mockAggregationQuery);
      expect(mock.calls[0][0]).toEqual(baseUrl + view.queryURL);
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify(mockAggregationQuery),
      );
    });

    it('should throw an error if httpPost crashes', async () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const message = 'some error message';
      mockReject(Error(message));
      await expect(view.aggregation(mockAggregationQuery)).rejects.toThrow(
        Error,
      );
    });

    it('should return Promise<ElasticSearchViewAggregationResponse>', async () => {
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      const data = await view.aggregation(mockAggregationQuery);
      expect(data).toHaveProperty('aggregations');
    });
  });

  describe('filterByType()', () => {
    beforeEach(() => {
      // Mock our query response
      mockResponse(JSON.stringify(mockElasticSearchViewQueryResponse), {
        status: 200,
      });
    });

    afterEach(() => resetMocks());

    it('should call the ES endpoint with the proper query', async () => {
      const filterType =
        'https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/Person';
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      await view.filterByTypes([filterType]);
      const expectedQuery = {
        query: {
          bool: {
            filter: [
              {
                term: {
                  '@type':
                    'https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/Person',
                },
              },
            ],
          },
        },
      };

      expect(mock.calls[0][0]).toEqual(baseUrl + view.queryURL);
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(expectedQuery));
    });

    it('should call the ES endpoint and use a filter query with two types', async () => {
      const filterTypes = [
        'https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/Person',
        'somethingElse',
      ];
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      await view.filterByTypes(filterTypes);
      const expectedQuery = {
        query: {
          bool: {
            filter: [
              {
                term: {
                  '@type':
                    'https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/Person',
                },
              },
              {
                term: {
                  '@type': 'somethingElse',
                },
              },
            ],
          },
        },
      };
      expect(mock.calls[0][0]).toEqual(baseUrl + view.queryURL);
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(expectedQuery));
    });
  });

  describe('filterByConstrainedBy()', () => {
    beforeEach(() => {
      // Mock our query response
      mockResponses(
        [JSON.stringify(mockElasticSearchViewQueryResponse)],
        [JSON.stringify(mockElasticSearchViewAggregationResponse)],
      );
    });

    afterEach(() => resetMocks());

    it('should call the ES endpoint with the proper query', async () => {
      const constrainedBy = 'https://neuroshapes.org/dash/person';
      const view = new ElasticSearchView(
        orgLabel,
        projectLabel,
        mockElasticSearchViewResponse,
      );
      await view.filterByConstrainedBy(constrainedBy);
      const expectedQuery = {
        query: {
          term: { _constrainedBy: constrainedBy },
        },
      };
      expect(mock.calls[0][0]).toEqual(baseUrl + view.queryURL);
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(expectedQuery));
    });
  });
});
