import { GlobalWithFetchMock } from 'jest-fetch-mock';
import {
  mockCreateResolverResponse,
  mockGetCrossProjectResolverResponse,
  mockGetInProjectResolverResponse,
  mockDeprecateResolverResponse,
  mockGetAfterDeprecateResolverResponse,
  mockUpdateResolverResponse,
  mockGetAfterUpdateResolverResponse,
  mockTagResolverResponse,
  mockGetAfterTagResolverResponse,
  mockListResolverResponse
} from '../__mocks__/mocksResponses';
import Resolver from '../';
import Nexus from '../../Nexus';
import { PaginatedList } from '../../utils/types';
import { CrossProjectResolverPayload, TagResolverPayload } from '../types';

const { fetchMock } = <GlobalWithFetchMock>global;

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('Resolver class', () => {
  describe('Resolver.list()', () => {
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

  describe('Resolver.get()', () => {
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
      const r: Resolver = await Resolver.get(
        'myorg',
        'myproject',
        'crossprojectresolver1'
      );
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resolvers/myorg/myproject/crossprojectresolver1`,
      );
      expect(r).toBeInstanceOf(Resolver);
    });
  });

  describe('Resolver.create()', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockResponse(JSON.stringify(mockCreateResolverResponse), {
        status: 201,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call httpPut method with the proper url', async () => {
      const payload: CrossProjectResolverPayload = {
        "@type": ["CrossProject"],
        "priority": 1,
        "projects": ["myorg/myotherproject"],
        "identities": [{
          "@id": "http://api.url/v1/anonymous",
          "@type":	"Anonymous",
        }]
      };

      const r: Resolver = await Resolver.create(
        'myorg',
        'myproject',
        'crossprojectresolver2',
        payload,
      );

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resolvers/myorg/myproject/crossprojectresolver2`,
      );
      expect(r).toBeInstanceOf(Resolver);
    });
  });

  describe('Resolver.update()', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockResponses(
        [
          JSON.stringify(mockUpdateResolverResponse),
          { status: 200 }
        ],
        [
          JSON.stringify(mockGetAfterUpdateResolverResponse),
          { status: 200 }
        ],
      );
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call httpPut method with the proper url', async () => {
      const payload: CrossProjectResolverPayload = {
        "@type": ["CrossProject"],
        "priority": 2,
        "projects": ["myorg/myotherproject"],
        "identities": [{
          "@id": "http://api.url/v1/anonymous",
          "@type":	"Anonymous",
        }]
      };

      const r: Resolver = await Resolver.update(
        'myorg',
        'myproject',
        'crossprojectresolver2',
        1,
        payload,
      );

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resolvers/myorg/myproject/crossprojectresolver2?rev=1`,
      );
      expect(r).toBeInstanceOf(Resolver);
    });
  });

  describe('Resolver.tag()', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockResponses(
        [
          JSON.stringify(mockTagResolverResponse),
          { status: 200 }
        ],
        [
          JSON.stringify(mockGetAfterTagResolverResponse),
          { status: 200 }
        ],
      );
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call httpPost method with the proper url', async () => {
      const payload: TagResolverPayload = {
        "tag": "mytag",
        "rev": 2
      };

      const r: Resolver = await Resolver.tag(
        'myorg',
        'myproject',
        'crossprojectresolver2',
        2,
        payload,
      );

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resolvers/myorg/myproject/crossprojectresolver2/tags?rev=2`,
      );
      expect(r).toBeInstanceOf(Resolver);
    });
  });

  describe('Resolver.deprecate()', () => {
    beforeEach(() => {
      fetchMock.resetMocks();
      fetchMock.mockResponses(
        [
          JSON.stringify(mockDeprecateResolverResponse),
          { status: 200 }
        ],
        [
          JSON.stringify(mockGetAfterDeprecateResolverResponse),
          { status: 200 }
        ],
      );
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call httpDelete method with the proper url', async () => {
      const r: Resolver = await Resolver.deprecate(
        'myorg',
        'myproject',
        'crossprojectresolver2',
        3
      );

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resolvers/myorg/myproject/crossprojectresolver2?rev=3`,
      );
      expect(r).toBeInstanceOf(Resolver);
    });
  });
});
