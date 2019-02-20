import { resetMocks, mock, mockResponse } from 'jest-fetch-mock';
import Nexus, { File as NexusFile } from '../..';
import { FileResponse } from '../types';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

const mockPostFileResponse: FileResponse = {
  '@context': 'https://bluebrain.github.io/nexus/contexts/resource.json',
  '@id': 'base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9',
  '@type': 'File',
  _bytes: 670,
  _digest: {
    _algorithm: 'SHA-256',
    _value: '25fc54fba0beec17a598b5a68420ded1595b2f76f0a0b7c6077792ece828bc2e',
  },
  _filename: 'myfile.jpg',
  _mediaType: 'image/jpeg',
  _self:
    'https://nexus.example.com/v1/files/myorg/myproj/base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9',
  _constrainedBy: 'https://bluebrain.github.io/nexus/schemas/file.json',
  _project: 'https://nexus.example.com/v1/projects/myorg/myproj',
  _rev: 1,
  _deprecated: false,
  _createdAt: '2019-01-28T12:15:33.238Z',
  _createdBy: 'https://nexus.example.com/v1/anonymous',
  _updatedAt: '2019-01-28T12:15:33.238Z',
  _updatedBy: 'https://nexus.example.com/v1/anonymous',
};

function testClassProperties(file: NexusFile, response: FileResponse) {
  expect(file.id).toEqual(response['@id']);
  // We expect self to be cast into a URL object
  expect(file.self).toEqual(response._self);
  expect(file.constrainedBy).toEqual(response._constrainedBy);
  expect(file.project).toEqual(response._project);
  expect(file.createdAt).toEqual(response._createdAt);
  expect(file.createdBy).toEqual(response._createdBy);
  expect(file.updatedAt).toEqual(response._updatedAt);
  expect(file.updatedBy).toEqual(response._updatedBy);
  expect(file.rev).toEqual(response._rev);
  expect(file.deprecated).toEqual(response._deprecated);
  expect(file.filename).toEqual(response._filename);
  expect(file.bytes).toEqual(response._bytes);
  expect(file.digest.algorithm).toEqual(response._digest._algorithm);
  expect(file.digest.value).toEqual(response._digest._value);
  expect(file.mediaType).toEqual(response._mediaType);
  expect(file.raw).toEqual(response);
}

describe('File class', () => {
  afterEach(() => {
    resetMocks();
  });
  describe('It should create a File instance', () => {
    it('from a getByID example response', () => {
      const resource = new NexusFile(
        'testOrg',
        'testProject',
        mockPostFileResponse,
      );
      testClassProperties(resource, mockPostFileResponse);
    });
  });

  describe('File.create()', () => {
    it('should POST the new file with the expected payload', async () => {
      const myFile = new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      });
      const formData = new FormData();
      formData.append('file', myFile);
      NexusFile.create('myOrg', 'myProject', myFile);
      expect(mock.calls[0][1].body).toEqual(formData);
    });
  });
});
