import { resetMocks, mock, mockResponse } from 'jest-fetch-mock';
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
import {
  listResources,
  getResource,
  getSelfResource,
  createResource,
  deprecateResource,
  deprecateSelfResource,
  tagSelfResource,
  tagResource,
  listTags,
  listSelfTags,
  updateResource,
} from '../utils';
import Nexus from '../../Nexus';
import { PaginatedList } from '../../utils/types';
import {
  CreateResourcePayload,
  ResourceResponseCommon,
  ResourceResponse,
  UpdateResourcePayload,
  ResourceGetFormat,
} from '../types';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

function testClassProperties(
  resource: Resource,
  response: ResourceResponse | ResourceResponseCommon,
) {
  expect(resource.id).toEqual(response['@id']);
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
    it('should efault to the @id value if nothing else matches', () => {
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
      resetMocks();
      mockResponse(JSON.stringify(mockListResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should call httpGet method with the proper get views url', async () => {
      const resources: PaginatedList<Resource> = await listResources(
        'myorg',
        'myproject',
      );
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/resources/myorg/myproject`);
      expect(resources.total).toEqual(1);
      expect(resources.results[0]).toBeInstanceOf(Resource);
    });

    it('should call httpGet method with the proper pagination', async () => {
      listResources('myorg', 'myproject', { from: 2, size: 20 });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject?from=2&size=20`,
      );
    });
  });

  describe('getResource()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should call httpGet method with the proper get views url', async () => {
      const r: Resource = await getResource(
        'myorg',
        'myproject',
        'myschema',
        'myresource',
      );
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myresource`,
      );
      expect(r).toBeInstanceOf(Resource);
    });
  });

  describe('Resource.getAs()', () => {
    afterEach(() => {
      resetMocks();
    });
    describe('When format is JSON_LD', async () => {
      it('should call httpGet method with the proper header and parse as JSON', async () => {
        mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
        const resource = new Resource(
          'testOrg',
          'testProject',
          mockResourceResponse,
        );
        const resourceResponse = await resource.getAs(
          ResourceGetFormat.JSON_LD,
        );
        expect(mock.calls[0][0]).toEqual(mockResourceResponse['_self']);
        expect(mock.calls[0][1].headers.get('Accept')).toBe(
          'application/ld+json',
        );
        expect(resourceResponse).toHaveProperty(
          '_self',
          mockResourceResponse['_self'],
        );
      });
    });
    describe('When format is DOT', async () => {
      mockResponse(mockDotResponse, { status: 200 });
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockResourceResponse,
      );
      await resource.getAs(ResourceGetFormat.DOT);
      expect(mock.calls[0][0]).toEqual(mockResourceResponse['_self']);
      expect(mock.calls[0][1].headers.get('Accept')).toBe('text/vnd.graphviz');
    });
    describe('When format is N_TRIPLES', async () => {
      mockResponse(mockNTriplesResponse, { status: 200 });
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockResourceResponse,
      );
      await resource.getAs(ResourceGetFormat.N_TRIPLES);
      expect(mock.calls[0][0]).toEqual(mockResourceResponse['_self']);
      expect(mock.calls[0][1].headers.get('Accept')).toBe(
        'application/ntriples',
      );
    });
  });

  describe('getSelfResource()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should call httpGet method with the proper get views url', async () => {
      const r: Resource = await getSelfResource(
        'http://myurl.com',
        'myorg',
        'myproject',
      );
      expect(mock.calls[0][0]).toEqual('http://myurl.com');
      expect(r).toBeInstanceOf(Resource);
    });
  });

  describe('createResource()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should POST the new resource', async () => {
      const payload: CreateResourcePayload = {
        context: {
          name: 'http://schema.org/name',
          description: 'http://schema.org/description',
        },
      };

      createResource('myorg', 'myproject', 'myschema', payload);

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema`,
      );
      expect(mock.calls[0][1].method).toEqual('POST');
      expect(mock.calls[0][1].body).toEqual(
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

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myID`,
      );
      expect(mock.calls[0][1].method).toEqual('PUT');
      expect(mock.calls[0][1].body).toEqual(
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

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/${encodeURIComponent(
          'https://mywebsite.com',
        )}`,
      );
      expect(mock.calls[0][1].method).toEqual('PUT');
      expect(mock.calls[0][1].body).toEqual(
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

      expect(mock.calls[0][1].method).toEqual('POST');
      expect(mock.calls[0][1].body).toEqual(
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

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myresource`,
      );
      expect(mock.calls[0][1].method).toEqual('PUT');
      expect(mock.calls[0][1].body).toEqual(
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

      expect(mock.calls[0][1].method).toEqual('PUT');
      expect(mock.calls[0][1].body).toEqual(
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
      mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should deprecate the resource', async () => {
      deprecateResource('myorg', 'myproject', 'myschema', 'myresource', 2);

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myresource?rev=2`,
      );
      expect(mock.calls[0][1].method).toEqual('DELETE');
    });
  });

  describe('deprecateSelfResource()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should deprecate the resource using the self url', async () => {
      deprecateSelfResource('http://myresource.com', 3, 'myorg', 'myproject');

      expect(mock.calls[0][0]).toEqual('http://myresource.com?rev=3');
      expect(mock.calls[0][1].method).toEqual('DELETE');
    });
  });

  describe('tagSelfResource()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should tag the resource', async () => {
      tagResource('myorg', 'mylabel', 'myschema', 'myresource', 3, {
        tagName: 'mytag',
        tagFromRev: 2,
      });

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/mylabel/myschema/myresource/tags?rev=3`,
      );
      expect(mock.calls[0][1].method).toEqual('POST');
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify({ tag: 'mytag', rev: 2 }),
      );
    });
  });

  describe('tagSelfResource()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should tag the resource using the self url', async () => {
      tagSelfResource(
        'http://myresource.com',
        3,
        { tagName: 'mytag', tagFromRev: 2 },
        'myorg',
        'mylabel',
      );

      expect(mock.calls[0][0]).toEqual('http://myresource.com/tags?rev=3');
      expect(mock.calls[0][1].method).toEqual('POST');
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify({ tag: 'mytag', rev: 2 }),
      );
    });
  });

  describe('getTags()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should tag the resource', async () => {
      listTags('myorg', 'myproject', 'myschema', 'myresource');

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myresource/tags`,
      );
    });
  });

  describe('getSelfTags()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should tag the resource', async () => {
      listSelfTags('http://myresource.com');

      expect(mock.calls[0][0]).toEqual('http://myresource.com/tags');
    });
  });

  describe('updateSelf()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockResourceResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
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

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myId?rev=1`,
      );
      expect(mock.calls[0][1].method).toEqual('PUT');
      expect(mock.calls[0][1].body).toEqual(
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

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/resources/myorg/myproject/myschema/myId?rev=1`,
      );
      expect(mock.calls[0][1].method).toEqual('PUT');
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify({
          myFancyField: updatePayload.myFancyField,
        }),
      );
    });
  });
});
