import Resource, {
  ResourceResponse,
  ResourceResponseCommon,
} from '../Resource';

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
      accessURL: {
        '@id': 'dcat:accessURL',
      },
      agent: {
        '@id': 'prov:agent',
      },
      atlasSpatialReferenceSystem: {
        '@id': 'nsg:atlasSpatialReferenceSystem',
      },
      brainLocation: {
        '@id': 'nsg:brainLocation',
      },
      brainRegion: {
        '@id': 'nsg:brainRegion',
      },
      byteSize: {
        '@id': 'dcat:byteSize',
      },
      contribution: {
        '@id': 'nsg:contribution',
      },
      coordinatesInBrainAtlas: {
        '@id': 'nsg:coordinatesInBrainAtlas',
      },
      dc: 'http://purl.org/dc/elements/1.1/',
      dcat: 'http://www.w3.org/ns/dcat#',
      dcterms: 'http://purl.org/dc/terms/',
      digest: {
        '@id': 'nxv:digest',
      },
      distribution: {
        '@id': 'dcat:distribution',
      },
      downloadURL: {
        '@id': 'dcat:downloadURL',
      },
      label: {
        '@id': 'rdfs:label',
      },
      license: {
        '@id': 'dcat:license',
      },
      maxValue: {
        '@id': 'schema:maxValue',
      },
      mediaType: {
        '@id': 'dcat:mediaType',
      },
      minValue: {
        '@id': 'schema:minValue',
      },
      nsg:
        'https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/',
      nxv: 'https://bbp-nexus.epfl.ch/vocabs/nexus/core/terms/v0.1.0/',
      objectOfStudy: {
        '@id': 'nsg:objectOfStudy',
      },
      owl: 'http://www.w3.org/2002/07/owl#',
      prov: 'http://www.w3.org/ns/prov#',
      rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
      rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
      repository: {
        '@id': 'nsg:repository',
      },
      schema: 'http://schema.org/',
      sh: 'http://www.w3.org/ns/shacl#',
      shsh: 'http://www.w3.org/ns/shacl-shacl#',
      skos: 'http://www.w3.org/2004/02/skos/core#',
      species: {
        '@id': 'nsg:species',
      },
      subject: {
        '@id': 'nsg:subject',
      },
      this: 'http://example.org/minds/',
      type: {
        '@id': 'rdf:type',
      },
      unitCode: {
        '@id': 'schema:unitCode',
      },
      value: {
        '@id': 'schema:value',
      },
      valueX: {
        '@id': 'nsg:valueX',
      },
      valueY: {
        '@id': 'nsg:valueY',
      },
      valueZ: {
        '@id': 'nsg:valueZ',
      },
      vann: 'http://purl.org/vocab/vann/',
      void: 'http://rdfs.org/ns/void#',
      xml: 'http://www.w3.org/XML/1998/namespace',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
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
  _distribution: [
    {
      '@type': 'dcat:Distribution',
      _downloadURL:
        'https://bbp.epfl.ch/nexus/v1/resources/anorg/testcore/datashapes:reconstructedpatchedcell/https%3A%2F%2Fbbp.epfl.ch%2Fnexus%2Fv0%2Fdata%2Fbbp%2Fmorphology%2Freconstructedcell%2Fv0.1.0%2F29d3a491-d3b7-49b6-9033-99017513a8ae/attachments/mtC180800A_idC.asc',
      _originalFileName: 'mtC180800A_idC.asc',
      byteSize: 1810564,
      digest: {
        _algorithm: 'SHA-256',
        _value:
          '19defdc24063d225d925edf392f33cf2b5e68b3fb9179946a8123012a0417b0b',
      },
      mediaType: 'text/plain; charset=UTF-8',
    },
    {
      '@type': 'dcat:Distribution',
      _downloadURL: 'http://microcircuits.epfl.ch/#/article/article_3_mph',
      mediaType: 'text/plain; charset=UTF-8',
      repository: 'Neocortical Microcircuitry Collaboration Portal',
    },
  ],
  brainLocation: {
    '@type': 'nsg:BrainLocation',
    brainRegion: {
      '@id': 'http://purl.obolibrary.org/obo/UBERON_0008933',
      label: 'primary somatosensory cortex',
    },
  },
  contribution: {
    '@type': 'nsg:Contribution',
    agent: {
      '@id':
        'https://bbp.epfl.ch/nexus/v0/data/bbp/core/agent/v0.1.0/664380c8-5a22-4974-951c-68ca78c0b1f1',
      '@type': ['nsg:Agent', 'schema:Person'],
    },
  },
  'nsg:annotation': {
    '@type': 'nsg:MorphologyAnnotation',
    'nsg:hasBody': {
      '@id': 'http://uri.interlex.org/base/ilx_0383202',
      '@type': 'nsg:MType',
      label: 'L23_LBC',
    },
  },
  'nsg:derivation': [
    {
      '@type': 'prov:Derivation',
      'prov:entity': {
        '@id':
          'https://bbp.epfl.ch/nexus/v0/data/bbp/experiment/slice/v0.1.0/e6e2537e-1323-4783-8ab9-cfc999d6f8b6',
        '@type': ['nsg:Slice', 'prov:Entity'],
      },
    },
    {
      '@type': 'prov:Derivation',
      'prov:entity': {
        '@id':
          'https://bbp.epfl.ch/nexus/v0/data/bbp/morphology/labeledcell/v0.1.0/3174c067-a9aa-4ee3-a625-76b00ec7b6d4',
        '@type': ['prov:Entity', 'nsg:LabeledCell'],
      },
    },
    {
      '@type': 'prov:Derivation',
      'prov:entity': {
        '@id':
          'https://bbp.epfl.ch/nexus/v0/data/bbp/experiment/patchedcell/v0.1.0/658b72f8-f64f-4fc4-9f6e-cdde7e91f87f',
        '@type': ['nsg:PatchedCell', 'prov:Entity'],
      },
    },
    {
      '@type': 'prov:Derivation',
      'prov:entity': {
        '@id':
          'https://bbp.epfl.ch/nexus/v0/data/bbp/experiment/subject/v0.1.0/ba9916df-1f21-47d9-be4f-3f1612d2f429',
      },
    },
  ],
  'nsg:generation': {
    '@type': 'prov:Generation',
    'prov:activity': {
      '@id':
        'https://bbp.epfl.ch/nexus/v0/data/bbp/morphology/reconstruction/v0.1.0/6f7c9cac-489b-48ef-b313-531ec705dcc6',
      '@type': 'prov:Activity',
    },
  },
  'schema:image': {
    '@id':
      'https://bbp.epfl.ch/nexus/v0/data/bbp/core/entity/v0.1.0/617ed886-311b-4bbd-93c6-d85ceb692c4f',
    '@type': 'prov:Entity',
  },
  'schema:name': 'mtC180800A_idC',
  subject: {
    '@id':
      'https://bbp.epfl.ch/nexus/v0/data/bbp/experiment/subject/v0.1.0/ba9916df-1f21-47d9-be4f-3f1612d2f429',
    '@type': ['nsg:Subject', 'prov:Entity'],
  },
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
  expect(resource.self).toEqual(new URL(response._self));
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
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockGetByIDResponse,
      );
      testClassProperties(resource, mockGetByIDResponse);
    });

    it('it should put non-meta-data properties inside a data object', () => {
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockGetByIDResponse,
      );
      expect(resource.data.brainLocation).toEqual(
        mockGetByIDResponse.brainLocation,
      );
      expect(resource.data.contribution).toEqual(
        mockGetByIDResponse.contribution,
      );
    });

    it('from a list response example with @type as a string', () => {
      const resource = new Resource(
        'testOrg',
        'testProject',
        mockListResponseWithStringType,
      );
      expect(resource.type).toEqual(
        new Array(mockListResponseWithStringType['@type']),
      );
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
  });
});
