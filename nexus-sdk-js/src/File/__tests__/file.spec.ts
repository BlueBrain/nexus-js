import { resetMocks, mock, mockResponse } from 'jest-fetch-mock';
import Nexus, { File as NexusFile } from '../..';
import { FileResponse } from '../types';
import { Readable } from 'stream';
import fs from 'fs';

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
      expect(resource).toMatchSnapshot();
    });
  });

  describe('File.create()', () => {
    it('should POST the new file with the expected payload', async () => {
      mockResponse(JSON.stringify(mockPostFileResponse), { status: 200 });
      const buffer = new Buffer('abc');
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      await NexusFile.create('myOrg', 'myProject', stream);
      const body = mock.calls[0][1].body;
      expect(body._overheadLength).toBe(143);
    });
  });
});
