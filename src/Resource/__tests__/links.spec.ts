import Resource from '..';
import { resetMocks, mock, mockResponses } from 'jest-fetch-mock';
import {
  mockGetByIDResourceResponse,
  mockProjectResponse,
  mockSparqlViewResponse,
  mockResourceResponse,
} from '../../__mocks__/helpers';
import { SparqlViewQueryResponse } from '../../View/SparqlView/types';
import { PaginatedList } from '../../utils/types';
import { ResourceLink } from '../types';
import { getIncomingLinks } from '../utils';

const mockIncomingLinksQueryResponse: SparqlViewQueryResponse = {
  head: { vars: ['s', 'p'] },
  results: {
    bindings: [
      {
        p: {
          type: 'uri',
          value: 'https://mynexusinstance.com/vocabs/org/project/favoriteBuddy',
        },
        s: {
          type: 'uri',
          value: 'https://mynexusinstance.com/vocabs/org/project/_/jeff',
        },
      },
    ],
  },
};

const mockIncomingLinksCountResponse: SparqlViewQueryResponse = {
  head: { vars: ['total'] },
  results: {
    bindings: [
      {
        total: {
          datatype: 'http://www.w3.org/2001/XMLSchema#integer',
          type: 'literal',
          value: '2',
        },
      },
    ],
  },
};

describe('Incoming / Outgoing Links behavior', () => {
  const resource = new Resource<{
    subject: string;
  }>('testOrg', 'testProject', mockGetByIDResourceResponse);
  describe('getLinks()', () => {});
  describe('getIncomingLinks()', () => {
    beforeEach(() => {
      mockResponses(
        [JSON.stringify(mockSparqlViewResponse)],
        [JSON.stringify(mockIncomingLinksCountResponse)],
        [JSON.stringify(mockIncomingLinksQueryResponse)],
        [JSON.stringify(mockResourceResponse)],
      );
    });

    afterEach(() => {
      resetMocks();
    });
    it('should fetch a PaginatedList of ResourceLinks using the proper SPAQRL queries', async () => {
      const links: PaginatedList<ResourceLink> = await getIncomingLinks(
        'myorg',
        'myproject',
        'http://blah.com/resourceSelfID',
        {
          from: 0,
          size: 20,
        },
      );
      const countQuery =
        'SELECT (COUNT(?s) AS ?total)  WHERE { ?s ?p <http://blah.com/resourceSelfID>}';
      const paginatedQuery =
        'SELECT ?s ?p WHERE { ?s ?p <http://blah.com/resourceSelfID>} LIMIT 20 OFFSET 0';
      expect(mock.calls[1][1].body).toEqual(countQuery);
      expect(mock.calls[2][1].body).toEqual(paginatedQuery);
      expect(links.results[0]).toHaveProperty('predicate');
      expect(links.results[0]).toHaveProperty('link');
      expect(links.results[0].link).toBeInstanceOf(Resource);
    });
  });
  describe('Resource.getOutgoingLinks()', () => {});
});
