import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Nexus from '../..';
import NexusFile from '../index';
import { NexusFileResponse } from '../types';
import { Readable } from 'stream';
import { HttpConfigTypes } from '../../utils/http';

const { fetchMock } = <GlobalWithFetchMock>global;

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

function str2ab(str: string) {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i = i + 1) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

const fakeFileAsText = 'Pretend I am in binary or something :)';
const fakeFileAsArrayBuffer = str2ab(fakeFileAsText);
// for both POST and GET it will look the same
const mockFileResponse: NexusFileResponse = {
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
    fetchMock.resetMocks();
  });
  describe('It should create a File instance', () => {
    it('from a getByID example response', () => {
      const file = new NexusFile('testOrg', 'testProject', mockFileResponse);
      expect(file).toMatchSnapshot();
    });
  });

  describe('File.create()', () => {
    it('should POST the new file with the expected payload', async () => {
      fetchMock.mockResponse(JSON.stringify(mockFileResponse), { status: 200 });
      const buffer = new Buffer('abc');
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      await NexusFile.create('myOrg', 'myProject', stream);
      const body = fetchMock.mock.calls[0][1].body;
      expect(body._overheadLength).toBe(143);
    });
  });

  describe('NexusFile.getFileSelf()', () => {
    it('should GET the new file with the expected payload', async () => {
      fetchMock.mockResponse(JSON.stringify(mockFileResponse), { status: 200 });
      const selfURL =
        'https://nexus.example.com/v1/files/myorg/myproj/base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9';

      const nexus = new Nexus({ environment: 'http://api.url' });
      const file: NexusFile = await nexus.NexusFile.getFileSelf(selfURL);
      expect(fetchMock.mock.calls[0][0]).toEqual(selfURL);
      expect(file).toBeInstanceOf(NexusFile);
      expect(file.id).toEqual('base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9');
      expect(file.rawFile).toEqual(undefined);
    });

    it('should GET the new file with the optional fetchFile flag', async () => {
      fetchMock.mockResponses(
        [JSON.stringify(mockFileResponse), { status: 200 }],
        [fakeFileAsText, { status: 200 }],
      );
      const selfURL =
        'https://nexus.example.com/v1/files/myorg/myproj/base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9';
      const file: NexusFile = await NexusFile.getSelf(selfURL, {
        shouldFetchFile: true,
      });
      expect(fetchMock.mock.calls[0][0]).toEqual(selfURL);
      expect(file).toBeInstanceOf(NexusFile);
      expect(file.id).toEqual('base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9');
      expect(file.rawFile as ArrayBuffer).toEqual(fakeFileAsArrayBuffer);
    });

    it('should GET the new file with the optional fetchFile flag with Base64 option', async () => {
      fetchMock.mockResponses(
        [JSON.stringify(mockFileResponse), { status: 200 }],
        [fakeFileAsText, { status: 200 }],
      );
      const selfURL =
        'https://nexus.example.com/v1/files/myorg/myproj/base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9';
      const file: NexusFile = await NexusFile.getSelf(selfURL, {
        shouldFetchFile: true,
        receiveAs: HttpConfigTypes.BASE64,
      });
      expect(fetchMock.mock.calls[0][0]).toEqual(selfURL);
      expect(file).toBeInstanceOf(NexusFile);
      expect(file.id).toEqual('base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9');
      expect(file.rawFile).toEqual(btoa(fakeFileAsText));
    });
  });

  describe('NexusFile.getFile()', () => {
    it('should GET the new file with the expected payload', async () => {
      fetchMock.mockResponse(JSON.stringify(mockFileResponse), { status: 200 });
      const nexus = new Nexus({ environment: 'http://api.url' });
      const file: NexusFile = await nexus.NexusFile.getFile(
        'myOrg',
        'myProject',
        'base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9',
      );
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/files/myOrg/myProject/base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9`,
      );
      expect(file).toBeInstanceOf(NexusFile);
      expect(file.id).toEqual('base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9');
      expect(file.rawFile).toEqual(undefined);
    });

    it('should GET the actual file if you add the optional flag', async () => {
      fetchMock.mockResponses(
        [JSON.stringify(mockFileResponse), { status: 200 }],
        [fakeFileAsText, { status: 200 }],
      );
      const nexus = new Nexus({ environment: 'http://api.url' });
      const file: NexusFile = await nexus.NexusFile.getFile(
        'myOrg',
        'myProject',
        'base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9',
        {
          shouldFetchFile: true,
        },
      );
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/files/myOrg/myProject/base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9`,
      );
      expect(file).toBeInstanceOf(NexusFile);
      expect(file.id).toEqual('base:d8848d4c-68f7-4ffd-952f-63a8cbcb86a9');
      expect(file.rawFile as ArrayBuffer).toEqual(fakeFileAsArrayBuffer);
    });
  });

  describe('File.getFile()', () => {
    it('should request the raw file', async () => {
      fetchMock.mockResponse(fakeFileAsText, { status: 200 });
      const file = new NexusFile('testOrg', 'testProject', mockFileResponse);
      await file.getFile();
      const headers = fetchMock.mock.calls[0][1].headers;
      expect(headers.get('Accept')).toBe('*/*');
      expect(file.rawFile).toEqual(fakeFileAsArrayBuffer);
    });
  });
});
