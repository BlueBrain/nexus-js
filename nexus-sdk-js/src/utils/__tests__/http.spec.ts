import { resetMocks, mockResponse, mock } from 'jest-fetch-mock';
import { httpGet, httpPost, HttpConfigTypes } from '../http';
import Nexus from '../../Nexus';
import { Headers } from 'cross-fetch';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('http module', () => {
  describe('httpGet()', () => {
    afterEach(() => {
      resetMocks();
    });
    it('should make a call GET request to the requested URL', async () => {
      mockResponse('{}');
      httpGet('/service');
      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/service`);
    });
    it('should not use the base URL', async () => {
      mockResponse('{}');
      httpGet('http://whatever.com', { useBase: false });
      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0][0]).toEqual('http://whatever.com');
    });
    it('should make a call with the expected default headers', async () => {
      mockResponse('{}');
      httpGet('/service');
      expect(mock.calls[0][1].headers).toEqual(
        new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          mode: 'cors',
        }),
      );
    });
    it('should successfully parse JSON', async () => {
      const payload = { message: 'success' };
      mockResponse(JSON.stringify(payload), { status: 200 });
      const response: JSON = await httpGet('/endpoint');
      expect(response).toEqual(payload);
    });
    it('should throw an error', async () => {
      const payload = { message: 'error' };
      mockResponse(JSON.stringify(payload), { status: 404 });
      await expect(httpGet('')).rejects.toThrow(Error);
    });
  });

  describe('httpPost()', () => {
    afterEach(() => {
      resetMocks();
    });
    it('should make a call POST request to the requested URL', async () => {
      mockResponse('{}');
      httpPost('/service');
      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/service`);
      expect(mock.calls[0][1].method).toEqual('POST');
    });
    it('should not use the base URL', async () => {
      mockResponse('{}');
      httpPost('http://whatever.com', null, { useBase: false });
      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0][0]).toEqual('http://whatever.com');
    });
    it('should make a call with the expected default headers', async () => {
      mockResponse('{}');
      httpPost('/service');
      expect(mock.calls[0][1].headers).toEqual(
        new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          mode: 'cors',
        }),
      );
    });
    it('should successfully parse JSON', async () => {
      const payload = { message: 'success' };
      mockResponse(JSON.stringify(payload), { status: 200 });
      const response: JSON = await httpPost('/endpoint', {});
      expect(response).toEqual(payload);
    });
    it('should successfully prepare JSON', async () => {
      const payload = { message: 'success' };
      mockResponse(JSON.stringify(payload), { status: 200 });
      const myBody = { message: 'hello!' };
      httpPost('/endpoint', myBody);
      expect(mock.calls[0][1].body).toEqual(JSON.stringify(myBody));
    });
    it('should successfully parse prepare File', async () => {
      const payload = { message: 'success' };
      mockResponse(JSON.stringify(payload), { status: 200 });
      const myFile = new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      });
      const formData = new FormData();
      formData.append('file', myFile);
      httpPost('/endpoint', myFile, { sendAs: HttpConfigTypes.FILE });
      expect(mock.calls[0][1].body).toEqual(formData);
    });
    it('should throw an error', async () => {
      const payload = { message: 'error' };
      mockResponse(JSON.stringify(payload), { status: 404 });
      await expect(httpGet('')).rejects.toThrow(Error);
    });
  });
});
