import NexusFile from '..';
import { mockFetchers } from '../../testUtils';
import { FilePayload, UpdateFilePayload } from '../types';

const file = NexusFile(mockFetchers, { uri: 'http://api.url/v1' });

describe('File', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the files api with the right url', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await file.get('org', 'project', 'myId');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myId',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet call to the files api with the right url and query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await file.get('org', 'project', 'myId', { rev: 1 });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet call to get the file and parse the response with json headers', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await file.get('org', 'project', 'myId', { rev: 1 });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        Accept: 'application/json',
      });
    });

    it('should make httpGet call to get the file and parse the response correctly with no headers', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await file.get('org', 'project', 'myId', { rev: 1, as: 'blob' });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
      expect(fetchMock.mock.calls[0][1].headers).toEqual({});
    });
  });

  describe('list', () => {
    it('should make httpGet call to the files api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await file.list('org', 'project');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet with query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await file.list('org', 'project', {
        createdBy: 'me',
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project?createdBy=me',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('create', () => {
    it('should make httpPost call to the files api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const myFile = new FormData();
      myFile.append('filename.txt', "pretend I'm a file okay?");
      const payload: FilePayload = {
        file: myFile,
      };
      await file.create('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(myFile);
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });

    it('should make httpPut call to the files api with an id', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const myFile = new FormData();
      myFile.append('filename.txt', "pretend I'm a file okay?");
      const payload: FilePayload = {
        file: myFile,
        '@id': 'myFileId',
      };
      await file.create('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myFileId',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(myFile);
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });

    it('should pass extra headers', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const myFile = new FormData();
      myFile.append('filename.txt', "pretend I'm a file okay?");
      const payload: FilePayload = {
        file: myFile,
        '@id': 'myFileId',
      };
      await file.create('org', 'project', payload, {
        extraHeaders: {
          'HEADERS-YO': 'omgHEADERS!',
        },
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myFileId',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(myFile);
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        'HEADERS-YO': 'omgHEADERS!',
      });
    });

    it('should use a URL param for storage option', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const myFile = new FormData();
      myFile.append('filename.txt', "pretend I'm a file okay?");
      const payload: FilePayload = {
        file: myFile,
        '@id': 'myFileId',
        storage: 'someStorageId',
      };
      await file.create('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myFileId?storage=someStorageId',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(myFile);
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('update', () => {
    it('should make httpPut call to the files api with an id', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const myFile = new FormData();
      myFile.append('filename.txt', "pretend I'm a file okay?");
      const payload: UpdateFilePayload = {
        '@id': 'myFileId',
        file: myFile,
        rev: 1,
      };
      await file.update('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myFileId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(myFile);
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });

    it('should pass extra headers', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const myFile = new FormData();
      myFile.append('filename.txt', "pretend I'm a file okay?");
      const payload: UpdateFilePayload = {
        '@id': 'myFileId',
        file: myFile,
        rev: 1,
      };
      await file.update('org', 'project', payload, {
        extraHeaders: {
          'HEADERS-YO': 'omgHEADERS!',
        },
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myFileId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(myFile);
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
      expect(fetchMock.mock.calls[0][1].headers).toEqual({
        'HEADERS-YO': 'omgHEADERS!',
      });
    });

    it('should use a URL param for storage option', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const myFile = new FormData();
      myFile.append('filename.txt', "pretend I'm a file okay?");
      const payload: UpdateFilePayload = {
        file: myFile,
        '@id': 'myFileId',
        storage: 'someStorageId',
        rev: 1,
      };
      await file.update('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myFileId?rev=1&storage=someStorageId',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(myFile);
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('link', () => {
    it('should make httpPost call to the files api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        filename: 'somefile.txt',
        path: 'some/path',
        mediaType: 'image/png',
      };
      await file.link('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });

    it('should make httpPut call to the files api when there is an @id', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        '@id': 'myId',
        filename: 'somefile.txt',
        path: 'some/path',
        mediaType: 'image/png',
      };
      await file.link('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myId',
      );
      const { '@id': id, ...expected } = payload;
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(expected));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });

    it('should add storage to the path as a query param', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        '@id': 'myId',
        storage: 'someStorageId',
        filename: 'somefile.txt',
        path: 'some/path',
        mediaType: 'image/png',
      };
      await file.link('org', 'project', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myId?storage=someStorageId',
      );
      const { '@id': id, storage, ...expected } = payload;
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(expected));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('tag', () => {
    it('should make httpPost call to the files api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload = {
        rev: 1,
        previousRev: 1,
        tag: 'whatever',
      };
      await file.tag('org', 'project', 'myId', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myId/tags?rev=1',
      );
      const { previousRev, ...expected } = payload;
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(expected));
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
  });

  describe('deprecate', () => {
    it('should make httpDELETE call to the files api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await file.deprecate('org', 'project', 'myId', 1);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/files/org/project/myId?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });
});
