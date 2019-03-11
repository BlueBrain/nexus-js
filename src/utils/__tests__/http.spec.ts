import { GlobalWithFetchMock } from 'jest-fetch-mock';
import { httpGet, httpPost, HttpConfigTypes } from '../http';
import Nexus from '../../Nexus';

const { fetchMock } = <GlobalWithFetchMock>global;

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('http module', () => {
  describe('httpGet()', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('should make a call GET request to the requested URL', async () => {
      fetchMock.mockResponse('{}');
      httpGet('/service');
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/service`);
    });
    it('should not use the base URL', async () => {
      fetchMock.mockResponse('{}');
      httpGet('http://whatever.com', { useBase: false });
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(fetchMock.mock.calls[0][0]).toEqual('http://whatever.com');
    });
    it('should make a call with the expected default headers', async () => {
      fetchMock.mockResponse('{}');
      httpGet('/service');
      expect(fetchMock.mock.calls[0][1].headers).toEqual(
        new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          mode: 'cors',
        }),
      );
    });
    it('should successfully parse JSON', async () => {
      const payload = { message: 'success' };
      fetchMock.mockResponse(JSON.stringify(payload), { status: 200 });
      const response: JSON = await httpGet('/endpoint');
      expect(response).toEqual(payload);
    });
    it('should throw an error', async () => {
      const payload = { message: 'error' };
      fetchMock.mockResponse(JSON.stringify(payload), { status: 404 });
      await expect(httpGet('')).rejects.toThrow(Error);
    });
  });

  describe('httpPost()', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('should make a call POST request to the requested URL', async () => {
      fetchMock.mockResponse('{}');
      httpPost('/service');
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/service`);
      expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    });
    it('should not use the base URL', async () => {
      fetchMock.mockResponse('{}');
      httpPost('http://whatever.com', null, { useBase: false });
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(fetchMock.mock.calls[0][0]).toEqual('http://whatever.com');
    });
    it('should make a call with the expected default headers', async () => {
      fetchMock.mockResponse('{}');
      httpPost('/service');
      expect(fetchMock.mock.calls[0][1].headers).toEqual(
        new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          mode: 'cors',
        }),
      );
    });
    it('should successfully parse JSON', async () => {
      const payload = { message: 'success' };
      fetchMock.mockResponse(JSON.stringify(payload), { status: 200 });
      const response: JSON = await httpPost('/endpoint', {});
      expect(response).toEqual(payload);
    });
    it('should successfully prepare JSON', async () => {
      const payload = { message: 'success' };
      fetchMock.mockResponse(JSON.stringify(payload), { status: 200 });
      const myBody = { message: 'hello!' };
      httpPost('/endpoint', myBody);
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(myBody));
    });
    it('should successfully parse prepare File', async () => {
      const payload = { message: 'success' };
      fetchMock.mockResponse(JSON.stringify(payload), { status: 200 });
      const blob = new Blob(['abc'], { type: 'tet/plain ' });
      httpPost('/endpoint', blob, {
        sendAs: HttpConfigTypes.FILE,
      });
      expect(fetchMock.mock.calls[0][1].body).toEqual(blob);
    });
    it('should throw an error', async () => {
      const payload = { message: 'error' };
      fetchMock.mockResponse(JSON.stringify(payload), { status: 404 });
      await expect(httpGet('')).rejects.toThrow(Error);
    });
  });
});
