import { resetMocks, mock, mockResponse } from 'jest-fetch-mock';
import {
  mockResourceResponse,
  mockListResourceResponse,
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
} from '../types';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

const mockListResponseWithStringType: ResourceResponseCommon = {
  '@id': 'https://neuroshapes.org/commons/annotation',
  '@type': 'https://bluebrain.github.io/nexus/vocabulary/Schema',
  _self:
    'https://bbp.epfl.ch/nexus/v1/schemas/anorg/testcore/nsg:commons%2Fannotation',
  _constrainedBy:
    'https://bluebrain.github.io/nexus/schemas/shacl-20170720.ttl',
  _project: 'https://bbp.epfl.ch/nexus/v1/projects/anorg/testcore',
  _createdAt: '2018-11-14T21:16:56.220Z',
  _createdBy:
    'https://bbp.epfl.ch/nexus/v1/realms/BBP/users/f:9d46ddd6-134e-44d6-aa74-bdf00f48dfce:sy',
  _updatedAt: '2018-11-14T21:16:56.220Z',
  _updatedBy:
    'https://bbp.epfl.ch/nexus/v1/realms/BBP/users/f:9d46ddd6-134e-44d6-aa74-bdf00f48dfce:sy',
  _rev: 1,
  _deprecated: false,
};

const mockListResponseWithoutType: ResourceResponseCommon = {
  '@id': 'https://incf.github.io/neuroshapes/contexts/schema.json',
  _self:
    'https://bbp.epfl.ch/nexus/v1/resources/anorg/testcore/https%3A%2F%2Fbluebrain.github.io%2Fnexus%2Fschemas%2Fresource.json/context:schema.json',
  _constrainedBy: 'https://bluebrain.github.io/nexus/schemas/resource.json',
  _project: 'https://bbp.epfl.ch/nexus/v1/projects/anorg/testcore',
  _createdAt: '2018-11-14T21:16:54.230Z',
  _createdBy:
    'https://bbp.epfl.ch/nexus/v1/realms/BBP/users/f:9d46ddd6-134e-44d6-aa74-bdf00f48dfce:sy',
  _updatedAt: '2018-11-15T08:40:52.735Z',
  _updatedBy:
    'https://bbp.epfl.ch/nexus/v1/realms/BBP/users/f:9d46ddd6-134e-44d6-aa74-bdf00f48dfce:sy',
  _rev: 2,
  _deprecated: false,
};

const mockGetByIDResponse: ResourceResponse = {
  '@context': [
    {
      Dataset: {
        '@id': 'dcat:Dataset',
      },
    },
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  '@id':
    'https://bbp.epfl.ch/nexus/v0/data/bbp/morphology/reconstructedcell/v0.1.0/29d3a491-d3b7-49b6-9033-99017513a8ae',
  '@type': [
    'nsg:ReconstructedCell',
    'prov:Entity',
    'Dataset',
    'nsg:ReconstructedPatchedCell',
    'nsg:InVitroSliceReconstructedPatchedNeuron',
  ],
  subject:
    'https://bbp.epfl.ch/nexus/v0/data/bbp/experiment/subject/v0.1.0/ba9916df-1f21-47d9-be4f-3f1612d2f429',
  _self:
    'https://bbp.epfl.ch/nexus/v1/resources/anorg/testcore/datashapes:reconstructedpatchedcell/https%3A%2F%2Fbbp.epfl.ch%2Fnexus%2Fv0%2Fdata%2Fbbp%2Fmorphology%2Freconstructedcell%2Fv0.1.0%2F29d3a491-d3b7-49b6-9033-99017513a8ae',
  _constrainedBy: 'https://neuroshapes.org/dash/reconstructedpatchedcell',
  _project: 'https://bbp.epfl.ch/nexus/v1/projects/anorg/testcore',
  _createdAt: '2018-11-15T08:49:59.873Z',
  _createdBy:
    'https://bbp.epfl.ch/nexus/v1/realms/BBP/users/f:9d46ddd6-134e-44d6-aa74-bdf00f48dfce:sy',
  _updatedAt: '2018-11-26T08:49:44.148Z',
  _updatedBy:
    'https://bbp.epfl.ch/nexus/v1/realms/BBP/users/f:9d46ddd6-134e-44d6-aa74-bdf00f48dfce:sy',
  _rev: 13,
  _deprecated: false,
};

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
      }>('testOrg', 'testProject', mockGetByIDResponse);
      testClassProperties(resource, mockGetByIDResponse);
    });

    it('it should put non-meta-data properties inside a data object', () => {
      const resource = new Resource<{
        subject: string;
      }>('testOrg', 'testProject', mockGetByIDResponse);
      expect(resource.data.subject).toEqual(mockGetByIDResponse.subject);
      expect(resource.data.subject).toEqual(mockGetByIDResponse.subject);
    });

    it('from a list response example with @type as a string', () => {
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockListResponseWithStringType,
      );
      expect(resource.type).toEqual([mockListResponseWithStringType['@type']]);
      testClassProperties(resource, mockListResponseWithStringType);
    });

    it('from a list response example that has no type at all', () => {
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockListResponseWithoutType,
      );
      expect(resource.type).toBeUndefined();
      testClassProperties(resource, mockListResponseWithoutType);
    });

    it('fails to compile if we give it a strict type for data', () => {
      const resource = new Resource<{
        banana: string;
      }>('testOrg', 'testProject', mockGetByIDResponse);
      expect(resource.data.banana).toBeUndefined();
    });

    it('should create a resourceURL where the last url segment is a URL-encoded ID', () => {
      const resource = new Resource<{
        subject: string;
      }>('testOrg', 'testProject', mockGetByIDResponse);

      const expectedURL = `/resources/testOrg/testProject/resource/${encodeURIComponent(
        mockGetByIDResponse['@id'],
      )}`;

      expect(resource.resourceURL).toEqual(expectedURL);
    });
  });

  describe('.name', () => {
    it('should match the name property if defined', () => {
      const myName = 'Foo';
      const resource = new Resource('testOrg', 'testProject', {
        ...mockListResponseWithoutType,
        name: myName,
      });
      expect(resource.name).toEqual(myName);
    });
    it('should match a schema:name property if defined', () => {
      const myName = 'Foo';
      const resource = new Resource('testOrg', 'testProject', {
        ...mockListResponseWithoutType,
        'schema:name': myName,
      });
      expect(resource.name).toEqual(myName);
    });
    it('should match a "skos:prefLabel" property if defined over "name"', () => {
      const myName = 'Foo';
      const myPrefLabel = 'Bar';
      const resource = new Resource('testOrg', 'testProject', {
        ...mockListResponseWithoutType,
        'skos:prefLabel': myPrefLabel,
        name: myName,
      });
      expect(resource.name).toEqual(myPrefLabel);
    });
    it('should efault to the @id value if nothing else matches', () => {
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockListResponseWithoutType,
      );
      expect(resource.name).toEqual(mockListResponseWithoutType['@id']);
    });
    it('should return the overwritten value of .formatName() method', () => {
      const bar = 'FooBar';
      const resource = new Resource('testOrg', 'testProject', {
        ...mockListResponseWithoutType,
        foo: bar,
      });
      Resource.formatName = resource => resource.foo;
      expect(resource.name).toEqual(bar);
    });
  });

  describe('listResources()', () => {
    beforeEach(() => {
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
      const updatePayload: CreateResourcePayload = {
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
  });
});
