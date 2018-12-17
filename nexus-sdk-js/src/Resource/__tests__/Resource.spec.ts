import Resource, {
  ResourceResponse,
  ResourceResponseCommon,
} from '../../Resource';

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
  });
});
