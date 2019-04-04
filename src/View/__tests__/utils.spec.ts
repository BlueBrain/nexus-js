import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Nexus from '../../Nexus';
import {
  listViews,
  getView,
  getElasticSearchView,
  getSparqlView,
} from '../utils';

const { fetchMock } = <GlobalWithFetchMock>global;
const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

const mockElasticViewResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/view.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  '@id': 'nxv:myview2',
  '@type': ['ElasticSearchView', 'View', 'Alpha'],
  includeMetadata: false,
  mapping: {
    dynamic: false,
    properties: {
      '@id': {
        type: 'keyword',
      },
      '@type': {
        type: 'keyword',
      },
      bool: {
        type: 'boolean',
      },
      name: {
        type: 'keyword',
      },
      number: {
        type: 'long',
      },
    },
  },
  resourceSchemas: ['https://bluebrain.github.io/nexus/schemas/myschema'],
  sourceAsText: false,
  _uuid: '4f90ceff-45b7-442d-8536-d41705321d50',
  _self: 'https://nexus.example.com/v1/schemas/myorg/myproj/nxv:myview',
  _constrainedBy: 'https://bluebrain.github.io/nexus/schemas/view',
  _project: 'https://nexus.example.com/v1/projects/myorg/myproj',
  _createdAt: '2018-09-18T16:39:22.748Z',
  _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _updatedAt: '2018-09-18T17:10:22.748Z',
  _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _rev: 4,
  _deprecated: true,
};
const mockSparqlResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/view.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  '@id': 'nxv:myview',
  '@type': ['SparqlView', 'View', 'Alpha'],
  includeMetadata: false,
  resourceSchemas: ['https://bluebrain.github.io/nexus/schemas/myschema'],
  sourceAsText: false,
  _uuid: '4f90ceff-45b7-442d-8536-d41705321d50',
  _self: 'https://nexus.example.com/v1/schemas/myorg/myproj/nxv:myview',
  _constrainedBy: 'https://bluebrain.github.io/nexus/schemas/view',
  _project: 'https://nexus.example.com/v1/projects/myorg/myproj',
  _createdAt: '2018-09-18T16:39:22.748Z',
  _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _updatedAt: '2018-09-18T17:10:22.748Z',
  _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _rev: 4,
  _deprecated: true,
};
const mockList = {
  _results: [mockElasticViewResponse, mockSparqlResponse],
  _total: 2,
};
const mockEmptyList = {
  _results: [],
  _total: 0,
};

describe('Views utils functions', () => {
  describe('getView()', () => {
    beforeEach(() => {
      fetchMock.mockResponse('{}', { status: 200 });
    });
    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call the appropriate URL', async () => {
      await getView('myorg', 'myproject', 'viewid');
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/views/myorg/myproject/viewid`,
      );
    });
  });
  describe('listViews()', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call the appropriate URL', async () => {
      fetchMock.mockResponse(JSON.stringify(mockEmptyList), { status: 200 });
      await listViews('myorg', 'myproject');
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/views/myorg/myproject`,
      );
    });
    it('should return a Sparql and Elastic views', async () => {
      fetchMock.mockResponse(JSON.stringify(mockList), { status: 200 });
      const views = await listViews('myorg', 'myproject');
      expect(views.length).toEqual(2);
      expect(views).toMatchSnapshot();
    });
  });
  describe('getElasticSearchView()', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call the appropriate URL', async () => {
      fetchMock.mockResponse(JSON.stringify(mockElasticViewResponse), {
        status: 200,
      });
      await getElasticSearchView('myorg', 'myproject');
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/views/myorg/myproject/nxv:defaultElasticSearchIndex`,
      );
    });
    it.skip('should throw', async () => {
      fetchMock.mockResponse(JSON.stringify(mockSparqlResponse), {
        status: 200,
      });
      expect(async () => {
        await getElasticSearchView('myorg', 'myproject');
      }).toThrow();
    });
  });
  describe('getSparqlView()', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call the appropriate URL', async () => {
      fetchMock.mockResponse(JSON.stringify(mockSparqlResponse), {
        status: 200,
      });
      await getSparqlView('myorg', 'myproject');
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/views/myorg/myproject/nxv:defaultSparqlIndex`,
      );
    });
  });
});
