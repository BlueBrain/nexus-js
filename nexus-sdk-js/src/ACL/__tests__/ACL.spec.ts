import Nexus from '../../Nexus';
import { resetMocks, mockResponse, mock } from 'jest-fetch-mock';
import { mockACLResponse } from '../__mocks__/mockResponses';
import ACL from '..';
import { getACL } from '../utils';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('ACL utils', () => {
  describe('ACL class', () => {
    it('should return an instance of ACL', () => {
      const acl = new ACL(mockACLResponse);
      expect(acl).toBeInstanceOf(ACL);
    });
    it('should match snapshot', async () => {
      const acl = new ACL(mockACLResponse);
      expect(acl).toMatchSnapshot();
    });
  });

  describe('utils()', () => {
    describe('getAcl()', () => {
      beforeEach(() => {
        mockResponse('{}');
      });
      afterEach(() => {
        resetMocks();
      });
      it('should make a GET request', async () => {
        await getACL('myorg');
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/myorg`);
      });
      it('should make a GET request with rev query param', async () => {
        await getACL('myorg', { rev: 12 });
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/myorg?rev=12`);
      });
      it('should make a GET request with self query param', async () => {
        await getACL('myorg', { self: true });
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/myorg?self=true`);
      });
      it('should make a GET request with all query params', async () => {
        await getACL('myorg', { rev: 34, self: true });
        expect(mock.calls[0][0]).toEqual(
          `${baseUrl}/acls/myorg?rev=34&self=true`,
        );
      });
    });
  });
});
