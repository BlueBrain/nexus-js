import { ProjectResponse } from '../Project';
import { ListOrgsResponse, OrgResponse } from '../Organization';
import { ResourceResponse, ListResourceResponse } from '../Resource';
import { ViewsListResponse } from '../views';
import {
  ElasticSearchViewResponse,
  ElasticSearchViewQueryResponse,
} from '../views/ElasticSearchView';

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

// [KP] The mappings property here is verbose, but it's exactly what we expect
// from a default ESView response, so I think it's useful to keep here as-is.
export const mockViewsListResponse: ViewsListResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/search.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
    'https://bluebrain.github.io/nexus/contexts/view.json',
  ],
  _total: 2,
  _results: [
    {
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
    },
    {
      '@id': 'nxv:defaultSparqlIndex',
      '@type': ['View', 'SparqlView'],
      _uuid: 'd88b71d2-b8a4-4744-bf22-2d99ef5bd26b',
      _rev: 1,
      _deprecated: false,
    },
  ],
};

export const mockElasticSearchViewResponse: ElasticSearchViewResponse = mockViewsListResponse
  ._results[0] as ElasticSearchViewResponse;

export const mockElasticSearchViewQueryResponse: ElasticSearchViewQueryResponse = {
  _shards: {
    failed: 0,
    skipped: 0,
    successful: 0,
    total: 0,
  },
  hits: {
    hits: [
      {
        _score: 1,
        _id:
          'https://bbp.epfl.ch/nexus/v0/data/bbp/experiment/subject/v0.1.0/eb1b8cbb-ae00-44c0-889e-107e9f16faef',
        _index:
          'kg_v1_ed2a98da-e96f-4a7c-9362-f8e07a9e9151_684bd815-9273-46f4-ac1c-0383d4a98254_1',
        _source: {
          '@id':
            'https://bbp.epfl.ch/nexus/v0/data/bbp/experiment/subject/v0.1.0/eb1b8cbb-ae00-44c0-889e-107e9f16faef',
          '@type': [
            'http://www.w3.org/ns/prov#Entity',
            'https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/Subject',
          ],
          _original_source:
            '{"@context":{"xml":"http://www.w3.org/XML/1998/namespace","rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#","rdfs":"http://www.w3.org/2000/01/rdf-schema#","xsd":"http://www.w3.org/2001/XMLSchema#","owl":"http://www.w3.org/2002/07/owl#","skos":"http://www.w3.org/2004/02/skos/core#","prov":"http://www.w3.org/ns/prov#","dcat":"http://www.w3.org/ns/dcat#","sh":"http://www.w3.org/ns/shacl#","shsh":"http://www.w3.org/ns/shacl-shacl#","dcterms":"http://purl.org/dc/terms/","schema":"http://schema.org/","nxv":"https://bbp-nexus.epfl.ch/vocabs/nexus/core/terms/v0.1.0/","nsg":"https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/","this":"http://example.org/minds/","dc":"http://purl.org/dc/elements/1.1/","vann":"http://purl.org/vocab/vann/","void":"http://rdfs.org/ns/void#","Dataset":{"@id":"dcat:Dataset"},"valueZ":{"@id":"nsg:valueZ"},"digest":{"@id":"nxv:digest"},"maxValue":{"@id":"schema:maxValue"},"unitCode":{"@id":"schema:unitCode"},"contribution":{"@id":"nsg:contribution"},"type":{"@id":"rdf:type"},"license":{"@id":"dcat:license"},"accessURL":{"@id":"dcat:accessURL"},"subject":{"@id":"nsg:subject"},"label":{"@id":"rdfs:label"},"valueX":{"@id":"nsg:valueX"},"species":{"@id":"nsg:species"},"valueY":{"@id":"nsg:valueY"},"repository":{"@id":"nsg:repository"},"agent":{"@id":"prov:agent"},"objectOfStudy":{"@id":"nsg:objectOfStudy"},"byteSize":{"@id":"dcat:byteSize"},"coordinatesInBrainAtlas":{"@id":"nsg:coordinatesInBrainAtlas"},"value":{"@id":"schema:value"},"downloadURL":{"@id":"dcat:downloadURL"},"atlasSpatialReferenceSystem":{"@id":"nsg:atlasSpatialReferenceSystem"},"mediaType":{"@id":"dcat:mediaType"},"brainLocation":{"@id":"nsg:brainLocation"},"distribution":{"@id":"dcat:distribution"},"brainRegion":{"@id":"nsg:brainRegion"},"minValue":{"@id":"schema:minValue"}},"@id":"https://bbp.epfl.ch/nexus/v0/data/bbp/experiment/subject/v0.1.0/eb1b8cbb-ae00-44c0-889e-107e9f16faef","@type":["nsg:Subject","prov:Entity"],"schema:name":"Rattus norvegicus Wistar Han","nsg:providerId":"C300797C","species":{"@id":"http://purl.obolibrary.org/obo/NCBITaxon_10116","label":"Rattus norvegicus"},"nsg:strain":{"@id":"http://purl.obolibrary.org/obo/RS_0001833","label":"Wistar Han"}}',
          _self:
            'https://bbp.epfl.ch/nexus/v1/resources/anorg/testcore/datashapes:subject/https%3A%2F%2Fbbp.epfl.ch%2Fnexus%2Fv0%2Fdata%2Fbbp%2Fexperiment%2Fsubject%2Fv0.1.0%2Feb1b8cbb-ae00-44c0-889e-107e9f16faef',
          _constrainedBy: 'https://neuroshapes.org/dash/subject',
          _project: 'https://bbp.epfl.ch/nexus/v1/projects/anorg/testcore',
          _createdAt: '2018-11-21T00:02:27.206Z',
          _createdBy:
            'https://bbp.epfl.ch/nexus/v1/realms/BBP/users/f:9d46ddd6-134e-44d6-aa74-bdf00f48dfce:sy',
          _updatedAt: '2018-11-26T11:00:29.200Z',
          _updatedBy:
            'https://bbp.epfl.ch/nexus/v1/realms/BBP/users/f:9d46ddd6-134e-44d6-aa74-bdf00f48dfce:sy',
          _rev: 11,
          _deprecated: false,
        },
        _type: 'doc',
      },
    ],
    max_score: 1,
    total: 3341,
  },
  timed_out: false,
  took: 8,
};
