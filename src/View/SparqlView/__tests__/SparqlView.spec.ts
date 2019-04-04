import { GlobalWithFetchMock } from 'jest-fetch-mock';
import SparqlView from '../../SparqlView';
import {
  mockSparqlViewResponse,
  mockProjectResponse,
} from '../../../__mocks__/helpers';
import Project from '../../../Project';
import { SparqlViewQueryResponse, SparqlViewResponse } from '../types';
import { getViewStatistics } from '../../../Statistics/utils';
jest.mock('../../../Statistics/utils');

const { fetchMock } = <GlobalWithFetchMock>global;

const project = new Project(mockProjectResponse);
const mockSparlQueryResponse: SparqlViewQueryResponse = {
  head: {
    vars: ['s', 'p', 'o'],
  },
  results: {
    bindings: [
      {
        o: {
          datatype: 'http://www.w3.org/2001/XMLSchema#dateTime',
          type: 'literal',
          value: '2018-11-13T09:41:53.699Z',
        },
        p: {
          type: 'uri',
          value: 'https://bluebrain.github.io/nexus/vocabulary/createdAt',
        },
        s: {
          type: 'uri',
          value: 'https://bluebrain.github.io/nexus/schemas/myschema',
        },
      },
      {
        o: {
          datatype: 'http://www.w3.org/2001/XMLSchema#boolean',
          type: 'literal',
          value: 'false',
        },
        p: {
          type: 'uri',
          value: 'https://bluebrain.github.io/nexus/vocabulary/deprecated',
        },
        s: {
          type: 'uri',
          value: 'https://bluebrain.github.io/nexus/schemas/myschema',
        },
      },
      {
        o: {
          type: 'uri',
          value: 'http://exmaple.com/projects/bbp/example',
        },
        p: {
          type: 'uri',
          value: 'https://bluebrain.github.io/nexus/vocabulary/project',
        },
        s: {
          type: 'uri',
          value: 'https://bluebrain.github.io/nexus/schemas/myschema',
        },
      },
    ],
  },
};

function testClassProperties(view: SparqlView, response: SparqlViewResponse) {
  expect(view.id).toEqual(response['@id']);
  expect(view.type).toEqual(response['@type']);
  expect(view.uuid).toEqual(response._uuid);
  expect(view.rev).toEqual(response._rev);
  expect(view.deprecated).toEqual(response._deprecated);
}

describe('Sparql View class', () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });
  const orgLabel = 'my-org';
  const projectLabel = 'example';
  const view = new SparqlView(orgLabel, projectLabel, mockSparqlViewResponse);
  it('Should create a SparqlView instance', () => {
    expect(view).toBeInstanceOf(SparqlView);
  });
  it('Should convert JSON payload into class attributes', () => {
    testClassProperties(view, mockSparqlViewResponse);
  });
  it('should get the Sparql view', async () => {
    fetchMock.mockResponse(JSON.stringify(mockSparqlViewResponse));
    const view: SparqlView = await SparqlView.get(orgLabel, projectLabel);
    expect(fetchMock.mock.calls.length).toBe(1);
    expect(view.id).toBe(mockSparqlViewResponse['@id']);
    expect(view.deprecated).toBe(mockSparqlViewResponse._deprecated);
    expect(view.orgLabel).toBe('my-org');
    expect(view.projectLabel).toBe('example');
    expect(view.rev).toBe(mockSparqlViewResponse._rev);
    expect(view.type).toEqual(mockSparqlViewResponse['@type']);
    expect(view.uuid).toBe(mockSparqlViewResponse._uuid);
  });

  describe('query()', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('should query the Sparql view', async () => {
      fetchMock.mockResponses([
        JSON.stringify(mockSparlQueryResponse),
        { status: 200 },
      ]);
      const result: SparqlViewQueryResponse = await view.query(
        'SELECT * where {?s ?p ?o} LIMIT 3',
      );
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(result.head.vars.length).toBe(3);
    });
  });
  describe('methods', () => {
    it('should call the method with the proper args', async () => {
      const view = new SparqlView(
        orgLabel,
        projectLabel,
        mockSparqlViewResponse,
      );
      await view.getStatistics();
      expect(getViewStatistics).toHaveBeenCalledWith(
        'my-org',
        'example',
        'nxv:defaultSparqlIndex',
      );
    });
  });
});
