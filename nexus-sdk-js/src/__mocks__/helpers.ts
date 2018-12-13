import { ProjectResponse } from '../Project';
import { ListOrgsResponse, OrgResponse } from '../Organization';
import { ResourceResponse, ListResourceResponse } from '../Resource';
import { ElasticSearchViewResponse } from '../View/ElasticSearchView';

export const mockOrgResponse: OrgResponse = {
  '@context': 'https://bluebrain.github.io/nexus/contexts/organization',
  '@id': 'https://nexus.example.com/v1/orgs/myorg',
  '@type': 'nxv:Organization',
  name: 'myname',
  _label: 'myorg',
  _uuid: '659aed73-4cde-4016-93ec-67cbd308ac25',
  _self: 'https://nexus.example.com/v1/orgs/myorg',
  _constrainedBy: 'nxs:organization',
  _createdAt: '2018-09-18T09:58:00.801Z',
  _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _updatedAt: '2018-09-18T10:01:00.801Z',
  _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _rev: 4,
  _deprecated: true,
  projectNumber: 10,
};

export const mockProjectResponse: ProjectResponse = {
  '@context': 'https://bluebrain.github.io/nexus/contexts/project',
  '@id': 'https://nexus.example.com/v1/projects/myorg/myproject',
  '@type': 'nxv:Project',
  name: 'example project creation',
  label: 'example',
  base: 'https://nexus.example.com/v1/myorg/myproject/',
  prefixMappings: [
    {
      prefix: 'person',
      namespace: 'http://example.com/some/person',
    },
    {
      prefix: 'schemas',
      namespace: 'https://bluebrain.github.io/nexus/schemas/',
    },
    {
      prefix: 'ex',
      namespace: 'http://example.com/',
    },
  ],
  _label: 'myproject',
  _uuid: '968ad034-268a-4b07-aedd-219e3b2d8940',
  _self: 'https://nexus.example.com/v1/projects/myorg/myproject',
  _constrainedBy: 'nxs:project',
  _createdAt: '2018-09-18T09:58:00.801Z',
  _createdBy:
    'https://nexus.example.com/v1/realms/myrealm/users/f:ad46ddd6-134e-44d6-ab70-bdf00f48dfce:someone',
  _updatedAt: '2018-09-18T10:30:00.801Z',
  _updatedBy:
    'https://nexus.example.com/v1/realms/myrealm/users/f:ad46ddd6-134e-44d6-ab70-bdf00f48dfce:someone',
  _rev: 4,
  _deprecated: true,
  resourceNumber: 563,
};

export const mockListProjectResponse: ListOrgsResponse = {
  '@context': 'https://nexus.example.com/v1/contexts/nexus/core/search/v0.1.0',
  _results: [
    {
      _id: 'https://nexus.example.com/v1/projects/myorg/example',
      _source: {
        '@id': 'https://nexus.example.com/v1/projects/myorg/example',
      },
    },
    {
      _id: 'https://nexus.example.com/v1/projects/myorg/myproject',
      _source: {
        '@id': 'https://nexus.example.com/v1/projects/myorg/myproject',
      },
    },
  ],
  _total: 2,
  _links: {
    _self: 'https://nexus.example.com/v1/projects',
  },
};

export const mockResourceResponse: ResourceResponse = {
  '@context': '',
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

export const mockListResourceResponse: ListResourceResponse = {
  '@context': '',
  _results: [
    {
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
    },
  ],
  _total: 1,
};

export const mockElasticSearchViewResponse: ElasticSearchViewResponse = {
  '@id': 'nxv:defaultElasticIndex',
  '@type': ['View', 'Alpha', 'ElasticView'],
  _uuid: '684bd815-9273-46f4-ac1c-0383d4a98254',
  includeMetadata: true,
  mapping: {
    dynamic: false,
    properties: {
      '@id': {
        type: 'keyword',
      },
      '@type': {
        type: 'keyword',
      },
      _distribution: {
        properties: {
          '@id': {
            type: 'keyword',
          },
          '@type': {
            type: 'keyword',
          },
          _byteSize: {
            type: 'long',
          },
          _digest: {
            properties: {
              _algorithm: {
                type: 'keyword',
              },
              _value: {
                type: 'keyword',
              },
            },
            type: 'nested',
          },
          _downloadURL: {
            type: 'keyword',
          },
          _mediaType: {
            type: 'keyword',
          },
          _originalFileName: {
            type: 'keyword',
          },
        },
        type: 'nested',
      },
      _original_source: {
        type: 'text',
      },
      _self: {
        type: 'keyword',
      },
      _constrainedBy: {
        type: 'keyword',
      },
      _project: {
        type: 'keyword',
      },
      _createdAt: {
        type: 'date',
      },
      _createdBy: {
        type: 'keyword',
      },
      _updatedAt: {
        type: 'date',
      },
      _updatedBy: {
        type: 'keyword',
      },
      _rev: {
        type: 'long',
      },
      _deprecated: {
        type: 'boolean',
      },
    },
  },
  sourceAsText: true,
  _rev: 1,
  _deprecated: false,
};
