import { ProjectResponse, ListProjectsResponse } from '../Project';
import { ListOrgResponse, OrgResponse } from '../Organization';
import { ResourceResponse, ListResourceResponse } from '../Resource';
import { ViewsListResponse } from '../View/utils';
import {
  ElasticSearchViewResponse,
  ElasticSearchViewQueryResponse,
  ElasticSearchViewAggregationResponse,
} from '../View/ElasticSearchView';
import { SparqlViewResponse } from '../View/SparqlView';

export const mockOrgResponse: OrgResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/resource.json',
    'https://bluebrain.github.io/nexus/contexts/admin.json',
  ],
  '@id': 'https://nexus.example.com/v1/orgs/myorg',
  '@type': 'Organization',
  description: 'My Organization',
  _label: 'myorg',
  _uuid: 'bc0eba71-2a7f-40e8-ac90-5c97fc6f37d7',
  _rev: 4,
  _deprecated: true,
  _createdAt: '2018-09-18T09:58:00.801Z',
  _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _updatedAt: '2018-09-18T10:01:00.801Z',
  _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
};

export const mockListOrgResponse: ListOrgResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/admin.json',
    'https://bluebrain.github.io/nexus/contexts/search.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  _total: 2,
  _results: [
    {
      '@id': 'https://nexus.example.com/v1/orgs/myorg',
      '@type': 'Organization',
      description: 'My Organization',
      _label: 'myorg',
      _uuid: 'bc0eba71-2a7f-40e8-ac90-5c97fc6f37d7',
      _rev: 4,
      _deprecated: true,
      _createdAt: '2018-09-18T09:58:00.801Z',
      _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
      _updatedAt: '2018-09-18T10:01:00.801Z',
      _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
    },
    {
      '@id': 'https://nexus.example.com/v1/orgs/myorg2',
      '@type': 'Organization',
      description: 'My Second Organization',
      _label: 'myorg2',
      _uuid: 'b42e5206-f81e-430b-808d-5dac2599153d',
      _rev: 1,
      _deprecated: false,
      _createdAt: '2019-01-14T09:29:39.416Z',
      _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
      _updatedAt: '2019-01-14T09:29:39.416Z',
      _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
    },
  ],
};

export const mockProjectResponse: ProjectResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/resource.json',
    'https://bluebrain.github.io/nexus/contexts/admin.json',
  ],
  '@id': 'https://nexus.example.com/v1/projects/myorg/myproject',
  '@type': 'Project',
  base: 'https://nexus.example.com/v1/myorg/myproject/',
  vocab: 'https://schema.org/',
  apiMappings: [
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
  _organizationLabel: 'myorg',
  _organizationUuid: 'bc0eba71-2a7f-40e8-ac90-5c97fc6f37d7',
  _uuid: 'e622745d-5eea-4dc5-8318-58a3dd4101ff',
  _rev: 4,
  _deprecated: true,
  _createdAt: '2018-09-18T09:58:00.801Z',
  _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _updatedAt: '2018-09-18T10:30:00.801Z',
  _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
};

export const mockListProjectResponse: ListProjectsResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/admin.json',
    'https://bluebrain.github.io/nexus/contexts/search.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  _total: 1,
  _results: [
    {
      '@id': 'https://nexus.example.com/v1/projects/myorg/myproject',
      '@type': 'Project',
      base: 'http://nexus.example.com/',
      vocab: 'http://schema.org/',
      apiMappings: [
        {
          namespace: 'http://schema.org/',
          prefix: 'schema',
        },
      ],
      _uuid: 'e622745d-5eea-4dc5-8318-58a3dd4101ff',
      _label: 'myproject',
      _organizationUuid: 'bc0eba71-2a7f-40e8-ac90-5c97fc6f37d7',
      _organizationLabel: 'myorg',
      _rev: 4,
      _deprecated: true,
      _createdAt: '2018-09-18T09:58:00.801Z',
      _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
      _updatedAt: '2018-09-18T10:30:00.801Z',
      _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
    },
  ],
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
      '@id': 'nxv:defaultElasticSearchIndex',
      '@type': ['View', 'Alpha', 'ElasticSearchView'],
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

export const mockSparqlViewResponse: SparqlViewResponse = mockViewsListResponse
  ._results[1] as SparqlViewResponse;

export const mockElasticSearchViewAggregationResponse: ElasticSearchViewAggregationResponse = {
  aggregations: {
    schemas: {
      buckets: [
        {
          doc_count: 971,
          key: 'https://neuroshapes.org/dash/reconstructedpatchedcell',
        },
        {
          doc_count: 701,
          key: 'https://neuroshapes.org/dash/labeledcell',
        },
        {
          doc_count: 661,
          key: 'https://neuroshapes.org/dash/patchedcell',
        },
        {
          doc_count: 401,
          key: 'https://neuroshapes.org/dash/slice',
        },
        {
          doc_count: 396,
          key: 'https://neuroshapes.org/dash/subject',
        },
        {
          doc_count: 119,
          key: 'https://neuroshapes.org/dash/reconstruction',
        },
        {
          doc_count: 74,
          key: 'https://bluebrain.github.io/nexus/schemas/shacl-20170720.ttl',
        },
        {
          doc_count: 15,
          key: 'https://neuroshapes.org/dash/person',
        },
        {
          doc_count: 3,
          key: 'https://bluebrain.github.io/nexus/schemas/resource.json',
        },
      ],
      doc_count_error_upper_bound: 0,
      sum_other_doc_count: 0,
    },
  },
};

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
