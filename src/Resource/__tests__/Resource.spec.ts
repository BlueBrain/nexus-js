import { GlobalWithFetchMock } from 'jest-fetch-mock';
import {
  mockResourceResponse,
  mockListResourceResponse,
  mockDotResponse,
  mockNTriplesResponse,
  mockGetByIDResourceResponse,
  mockListResourceResponseWithStringType,
  mockListResourceResponseWithoutType,
} from '../../__mocks__/helpers';
import Resource from '../../Resource';
import makeResourceUtils from '../utils';
import Nexus from '../../Nexus';
import { PaginatedList } from '../../utils/types';
import {
  CreateResourcePayload,
  ResourceResponseCommon,
  ResourceResponse,
  UpdateResourcePayload,
  ResourceGetFormat,
} from '../types';
import store from '../../store';

const { fetchMock } = <GlobalWithFetchMock>global;

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

function testClassProperties(
  resource: Resource,
  response: ResourceResponse | ResourceResponseCommon,
) {
  expect(resource.id).toEqual(Resource.extractResolvableId(response._self));
  // We expect self to be cast into a URL object
  expect(resource.self).toEqual(response._self);
  expect(resource.constrainedBy).toEqual(response._constrainedBy);
  expect(resource.project).toEqual(response._project);
  expect(resource.createdAt).toEqual(response._createdAt);
  expect(resource.createdBy).toEqual(response._createdBy);
  expect(resource.updatedAt).toEqual(response._updatedAt);
  expect(resource.updatedBy).toEqual(response._updatedBy);
  expect(resource.rev).toEqual(response._rev);
  expect(resource.deprecated).toEqual(response._deprecated);
}

describe('Resource class', () => {
  const {
    getSelf: getSelfResource,
    getSelfRawAs: getSelfResourceRawAs,
    get: getResource,
    list: listResources,
    create: createResource,
    updateSelf: updateSelfResource,
    update: updateResource,
    deprecate: deprecateResource,
    deprecateSelf: deprecateSelfResource,
    tag: tagResource,
    tagSelf: tagSelfResource,
    listTags,
    listSelfTags,
  } = makeResourceUtils(store);
  describe('It should create a Resource instance', () => {
    it('from a getByID example response', () => {
      const resource = new Resource<{
        subject: string;
      }>('testOrg', 'testProject', mockGetByIDResourceResponse);
      testClassProperties(resource, mockGetByIDResourceResponse);
    });

    it('it should put non-meta-data properties inside a data object', () => {
      const resource = new Resource<{
        subject: string;
      }>('testOrg', 'testProject', mockGetByIDResourceResponse);
      expect(resource.data.subject).toEqual(
        mockGetByIDResourceResponse.subject,
      );
      expect(resource.data.subject).toEqual(
        mockGetByIDResourceResponse.subject,
      );
    });

    it('from a list response example with @type as a string', () => {
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockListResourceResponseWithStringType,
      );
      expect(resource.type).toEqual([
        mockListResourceResponseWithStringType['@type'],
      ]);
      testClassProperties(resource, mockListResourceResponseWithStringType);
    });

    it('from a list response example that has no type at all', () => {
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockListResourceResponseWithoutType,
      );
      expect(resource.type).toBeUndefined();
      testClassProperties(resource, mockListResourceResponseWithoutType);
    });

    it('fails to compile if we give it a strict type for data', () => {
      const resource = new Resource<{
        banana: string;
      }>('testOrg', 'testProject', mockGetByIDResourceResponse);
      expect(resource.data.banana).toBeUndefined();
    });

    it('should create a resourceURL where the last url segment is a URL-encoded ID', () => {
      const resource = new Resource<{
        subject: string;
      }>('testOrg', 'testProject', mockGetByIDResourceResponse);

      const expectedURL = `/resources/testOrg/testProject/_/${encodeURIComponent(
        mockGetByIDResourceResponse['@id'],
      )}`;

      expect(resource.resourceURL).toEqual(expectedURL);
    });
  });

  describe('.name', () => {
    it('should match the name property if defined', () => {
      const myName = 'Foo';
      const resource = new Resource('testOrg', 'testProject', {
        ...mockListResourceResponseWithoutType,
        name: myName,
      });
      expect(resource.name).toEqual(myName);
    });
    it('should match a schema:name property if defined', () => {
      const myName = 'Foo';
      const resource = new Resource('testOrg', 'testProject', {
        ...mockListResourceResponseWithoutType,
        'schema:name': myName,
      });
      expect(resource.name).toEqual(myName);
    });
    it('should match a "skos:prefLabel" property if defined over "name"', () => {
      const myName = 'Foo';
      const myPrefLabel = 'Bar';
      const resource = new Resource('testOrg', 'testProject', {
        ...mockListResourceResponseWithoutType,
        'skos:prefLabel': myPrefLabel,
        name: myName,
      });
      expect(resource.name).toEqual(myPrefLabel);
    });
    it('should default to the @id value if nothing else matches', () => {
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockListResourceResponseWithoutType,
      );
      expect(resource.name).toEqual(mockListResourceResponseWithoutType['@id']);
    });
    it('should return the overwritten value of .formatName() method', () => {
      const bar = 'FooBar';
      const resource = new Resource('testOrg', 'testProject', {
        ...mockListResourceResponseWithoutType,
        foo: bar,
      });
      Resource.formatName = resource => resource.foo;
      expect(resource.name).toEqual(bar);
    });
  });

  describe('listResources()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockListResourceResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call httpGet method with the proper get views url', async () => {
      const resources: PaginatedList<Resource> = await listResources(
        'myorg',
        'myproject',
      );
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject`,
      );
      expect(resources.total).toEqual(1);
      expect(resources.results[0]).toBeInstanceOf(Resource);
    });

    it('should call httpGet method with the proper pagination', async () => {
      listResources('myorg', 'myproject', { from: 2, size: 20 });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject?from=2&size=20`,
      );
    });
  });

  describe('getResource()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockResourceResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call httpGet method with the proper get views url', async () => {
      const r: Resource = await getResource(
        'myorg',
        'myproject',
        'myschema',
        'myresource',
      );
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myresource`,
      );
      expect(r).toBeInstanceOf(Resource);
      expect(r).toHaveProperty('expanded', undefined);
    });

    it('should call httpGet method with the proper get views url for expanded', async () => {
      const r: Resource = await getResource(
        'myorg',
        'myproject',
        'myschema',
        'myresource',
        { expanded: true },
      );
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myresource`,
      );
      expect(fetchMock.mock.calls[1][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myresource?format=expanded`,
      );
      expect(r).toBeInstanceOf(Resource);
      expect(r).toHaveProperty('expanded', mockResourceResponse);
    });
  });

  describe('Resource.getExpanded()', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('should fetch the expanded resource as an instance method', async () => {
      fetchMock.mockResponse(
        JSON.stringify({ '@id': 'https://myfancyresourcelocation.com/myID' }),
        {
          status: 200,
        },
      );
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockResourceResponse,
      );
      await resource.getExpanded();
      expect(resource.expanded).toEqual({
        '@id': 'https://myfancyresourcelocation.com/myID',
      });
    });
  });

  describe('Resource.getAs()', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });
    describe('When format is JSON_LD', () => {
      it('should call httpGet method with the proper header and parse as JSON', async () => {
        fetchMock.mockResponse(JSON.stringify(mockResourceResponse), {
          status: 200,
        });
        const resource = new Resource(
          'testOrg',
          'testProject',
          mockResourceResponse,
        );
        const resourceResponse = await resource.getAs(
          ResourceGetFormat.JSON_LD,
        );
        expect(fetchMock.mock.calls[0][0]).toEqual(
          mockResourceResponse['_self'],
        );
        expect(fetchMock.mock.calls[0][1].headers.get('Accept')).toBe(
          'application/ld+json',
        );
        expect(resourceResponse).toHaveProperty(
          '_self',
          mockResourceResponse['_self'],
        );
      });
    });
    describe('When format is DOT', () => {
      it('should call httpGet method with the proper accept header', async () => {
        fetchMock.mockResponse(mockDotResponse, { status: 200 });
        const resource = new Resource(
          'testOrg',
          'testProject',
          mockResourceResponse,
        );
        await resource.getAs(ResourceGetFormat.DOT);
        expect(fetchMock.mock.calls[0][0]).toEqual(
          mockResourceResponse['_self'],
        );
        expect(fetchMock.mock.calls[0][1].headers.get('Accept')).toBe(
          'text/vnd.graphviz',
        );
      });
    });
    describe('When format is N_TRIPLES', () => {
      it('should call httpGet method with the proper accept header', async () => {
        fetchMock.mockResponse(mockNTriplesResponse, { status: 200 });
        const resource = new Resource(
          'testOrg',
          'testProject',
          mockResourceResponse,
        );
        await resource.getAs(ResourceGetFormat.N_TRIPLES);
        expect(fetchMock.mock.calls[0][0]).toEqual(
          mockResourceResponse['_self'],
        );
        expect(fetchMock.mock.calls[0][1].headers.get('Accept')).toBe(
          'application/ntriples',
        );
      });
    });
  });

  describe('getSelfResource()', () => {
    beforeEach(() => {
      fetchMock.mockResponses(
        [
          JSON.stringify(mockResourceResponse),
          {
            status: 200,
          },
        ],
        ['{}', { status: 200 }],
      );
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should call httpGet method with the proper get views url', async () => {
      const r: Resource = await getSelfResource(
        'http://myurl.com/staging/v1/something/somethingelse/resources/myOrg/myProject/mySchema/fred',
      );
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://myurl.com/staging/v1/something/somethingelse/resources/myOrg/myProject/mySchema/fred',
      );
      expect(r).toBeInstanceOf(Resource);
      expect(r).toHaveProperty('orgLabel', 'myOrg');
      expect(r).toHaveProperty('projectLabel', 'myProject');
    });
    it('should call httpGet method with the proper get views url as well as fetching expanded data', async () => {
      const r: Resource = await getSelfResource(
        'http://myurl.com/staging/v1/something/somethingelse/resources/myOrg/myProject/mySchema/fred',
        { expanded: true },
      );
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://myurl.com/staging/v1/something/somethingelse/resources/myOrg/myProject/mySchema/fred',
      );
      expect(fetchMock.mock.calls[1][0]).toEqual(
        'http://myurl.com/staging/v1/something/somethingelse/resources/myOrg/myProject/mySchema/fred?format=expanded',
      );
      expect(r).toBeInstanceOf(Resource);
      expect(r).toHaveProperty('orgLabel', 'myOrg');
      expect(r).toHaveProperty('projectLabel', 'myProject');
    });
  });

  describe('createResource()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockResourceResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should POST the new resource', async () => {
      const payload: CreateResourcePayload = {
        context: {
          name: 'http://schema.org/name',
          description: 'http://schema.org/description',
        },
      };

      createResource('myorg', 'myproject', 'myschema', payload);

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ '@context': payload.context }),
      );
    });

    it('should PUT the new resource with an ID', async () => {
      const payload: CreateResourcePayload = {
        context: {
          name: 'http://schema.org/name',
          description: 'http://schema.org/description',
        },
        resourceId: 'myID',
      };

      createResource('myorg', 'myproject', 'myschema', payload);

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myID`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ '@context': payload.context }),
      );
    });

    it('should PUT a resource with resourceID with URIencoded URL', async () => {
      const payload: CreateResourcePayload = {
        context: {
          name: 'http://schema.org/name',
          description: 'http://schema.org/description',
        },
        resourceId: 'https://mywebsite.com',
      };

      createResource('myorg', 'myproject', 'myschema', payload);

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/${encodeURIComponent(
          'https://mywebsite.com',
        )}`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ '@context': payload.context }),
      );
    });

    it('should POST the new resource with the expected payload', async () => {
      const payload: CreateResourcePayload = {
        context: {
          name: 'http://schema.org/name',
          description: 'http://schema.org/description',
        },
        type: ['ex:lol'],
        name: 'my name',
        description: 'something',
      };

      createResource('myorg', 'myproject', 'myschema', payload);

      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({
          '@context': payload.context,
          '@type': payload.type,
          name: 'my name',
          description: 'something',
        }),
      );
    });

    it('should PUT the new resource', async () => {
      const payload: CreateResourcePayload = {
        context: {
          name: 'http://schema.org/name',
          description: 'http://schema.org/description',
        },
        resourceId: 'myresource',
      };

      createResource('myorg', 'myproject', 'myschema', payload);

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myresource`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ '@context': payload.context }),
      );
    });

    it('should PUT the new resource with the expected payload', async () => {
      const payload: CreateResourcePayload = {
        context: {
          name: 'http://schema.org/name',
          description: 'http://schema.org/description',
        },
        resourceId: 'myresource',
        type: ['ex:lol'],
        name: 'my name',
        description: 'something',
      };

      createResource('myorg', 'myproject', 'myschema', payload);

      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({
          '@context': payload.context,
          '@type': payload.type,
          name: 'my name',
          description: 'something',
        }),
      );
    });
  });

  describe('deprecateResource()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockResourceResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should deprecate the resource', async () => {
      deprecateResource('myorg', 'myproject', 'myschema', 'myresource', 2);

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myresource?rev=2`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });

  describe('deprecateSelfResource()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockResourceResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should deprecate the resource using the self url', async () => {
      deprecateSelfResource('http://myresource.com', 3, 'myorg', 'myproject');

      expect(fetchMock.mock.calls[0][0]).toEqual('http://myresource.com?rev=3');
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });

  describe('tagSelfResource()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockResourceResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should tag the resource', async () => {
      tagResource('myorg', 'mylabel', 'myschema', 'myresource', 3, {
        tagName: 'mytag',
        tagFromRev: 2,
      });

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/mylabel/myschema/myresource/tags?rev=3`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ tag: 'mytag', rev: 2 }),
      );
    });
  });

  describe('tagSelfResource()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockResourceResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should tag the resource using the self url', async () => {
      tagSelfResource(
        'http://myresource.com',
        3,
        { tagName: 'mytag', tagFromRev: 2 },
        'myorg',
        'mylabel',
      );

      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://myresource.com/tags?rev=3',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ tag: 'mytag', rev: 2 }),
      );
    });
  });

  describe('getTags()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockResourceResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should tag the resource', async () => {
      listTags('myorg', 'myproject', 'myschema', 'myresource');

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myresource/tags`,
      );
    });
  });

  describe('getSelfTags()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockResourceResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should tag the resource', async () => {
      listSelfTags('http://myresource.com');

      expect(fetchMock.mock.calls[0][0]).toEqual('http://myresource.com/tags');
    });
  });

  describe('updateSelf()', () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(mockResourceResponse), {
        status: 200,
      });
    });

    afterEach(() => {
      fetchMock.resetMocks();
    });

    it('should PUT to update the resource', async () => {
      const updatePayload: UpdateResourcePayload = {
        context: {
          name: 'http://schema.org/name',
          description: 'http://schema.org/description',
        },
        myFancyField: 'hello!',
      };

      updateResource(
        'myorg',
        'myproject',
        'myschema',
        'myId',
        1,
        updatePayload,
      );

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myId?rev=1`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({
          '@context': updatePayload.context,
          myFancyField: updatePayload.myFancyField,
        }),
      );
    });

    it('should PUT to update the resource even with no context', async () => {
      const updatePayload: UpdateResourcePayload = {
        myFancyField: 'hello!',
      };

      updateResource(
        'myorg',
        'myproject',
        'myschema',
        'myId',
        1,
        updatePayload,
      );

      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myId?rev=1`,
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({
          myFancyField: updatePayload.myFancyField,
        }),
      );
    });
  });
});
