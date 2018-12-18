import { resetMocks, mockResponse, mock, mockResponses } from 'jest-fetch-mock';
import SparqlView, {
  SparqlViewResponse,
  SparqlViewQueryResponse,
} from '../index';
import {
  mockSparqlViewResponse,
  mockProjectResponse,
  mockViewsListResponse,
} from '../../../__mocks__/helpers';
import Project from '../../../Project';

const project = new Project('my-org', mockProjectResponse);
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
    resetMocks();
  });
  const orgLabel = 'my-org';
  const projectLabel = 'my-project';
  const view = new SparqlView(orgLabel, projectLabel, mockSparqlViewResponse);
  it('Should create a SparqlView instance', () => {
    expect(view).toBeInstanceOf(SparqlView);
  });
  it('Should convert JSON payload into class attributes', () => {
    testClassProperties(view, mockSparqlViewResponse);
  });
  it('should get the Sparql view', async () => {
    mockResponse(JSON.stringify(mockViewsListResponse));
    const view: SparqlView = await project.getSparqlView();
    expect(mock.calls.length).toBe(1);
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
      resetMocks();
    });
    it('should get the Sparql view', async () => {
      mockResponses(
        [JSON.stringify(mockViewsListResponse)],
        [JSON.stringify(mockSparlQueryResponse)],
      );
      const view: SparqlView = await project.getSparqlView();
      const result: SparqlViewQueryResponse = await view.query(
        'SELECT * where {?s ?p ?o} LIMIT 3',
      );
      expect(mock.calls.length).toBe(2);
      expect(result.head.vars.length).toBe(3);
    });
  });
});
