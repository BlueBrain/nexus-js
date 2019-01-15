import { resetMocks, mockResponse, mock, mockResponses } from 'jest-fetch-mock';
import { httpGet } from '../http';
import Nexus from '../../Nexus';
import { Headers } from 'cross-fetch';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('http module', () => {
  describe('httpGet', () => {
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
      httpGet('http://whatever.com', false);
      expect(mock.calls.length).toBe(1);
      expect(mock.calls[0][0]).toEqual('http://whatever.com');
    });
    it('should make a call with the expected default headers', async () => {
      mockResponse('{}');
      httpGet('/service');
      expect(mock.calls[0][1].headers).toEqual(
        new Headers({ 'Content-Type': 'application/json', mode: 'cors' }),
      );
    });
    it('should successfully parse JSON', async () => {
      const payload = { message: 'success' };
      mockResponse(JSON.stringify(payload), { status: 200 });
      const response: JSON = await httpGet('/endpoint');
      expect(response).toEqual(payload);
    });
    it.skip('should throw an error', async () => {
      const payload = { message: 'error' };
      mockResponse(JSON.stringify(payload), { status: 404 });
      expect(() => httpGet('')).toThrowError();
    });
  });
});
