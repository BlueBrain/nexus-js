import { GlobalWithFetchMock } from 'jest-fetch-mock';
import {
  mockGetCrossProjectResolverResponse,
  mockGetInProjectResolverResponse,
  mockListResolverResponse
} from '../__mocks__/mocksResponses';
import Resolver from '../';
import Nexus from '../../Nexus';
import { PaginatedList } from '../../utils/types';

const { fetchMock } = <GlobalWithFetchMock>global;

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('Resolver class', () => {
  describe('listResolvers()', () => {
    beforeEach(() => {
      fetchMock.mockResponses(
        [
          JSON.stringify(mockListResolverResponse),
          { status: 200 }
        ],
        [
          JSON.stringify(mockGetInProjectResolverResponse),
          { status: 200 }
        ],
        [
          JSON.stringify(mockGetCrossProjectResolverResponse),
          { status: 200 }
        ],
      );
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call httpGet method with the proper url', async () => {
      const resources: PaginatedList<Resolver> = await Resolver.list(
        'myorg',
        'myproject',
      );
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resolvers/myorg/myproject`,
      );
      expect(resources.total).toEqual(2);
      expect(resources.results[0]).toBeInstanceOf(Resolver);
    });

    it('should call httpGet method with the proper pagination', async () => {
      Resolver.list('myorg', 'myproject', { from: 2, size: 20 });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resolvers/myorg/myproject?from=2&size=20`,
      );
    });
  });

  describe('getResolver()', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockResponse(JSON.stringify(mockGetCrossProjectResolverResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call httpGet method with the proper url', async () => {
        console.dir(fetchMock.mock.calls);
      const r: Resolver = await Resolver.get(
        'myorg',
        'myproject',
        'crossprojectresolver1'
      );
      console.dir(fetchMock.mock.calls);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resolvers/myorg/myproject/crossprojectresolver1`,
      );
      expect(r).toBeInstanceOf(Resolver);
    });
  });
});
