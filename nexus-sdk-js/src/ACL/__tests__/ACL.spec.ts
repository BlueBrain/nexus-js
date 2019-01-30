import Nexus from '../../Nexus';
import { resetMocks, mockResponse, mock } from 'jest-fetch-mock';
import {
  mockACLResponse,
  mockListACLResponse,
} from '../__mocks__/mockResponses';
import ACL from '..';
import { getACL, listACL } from '../utils';

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
        mockResponse(JSON.stringify(mockACLResponse));
      });
      afterEach(() => {
        resetMocks();
      });
      it('should make a GET request and return an ACL', async () => {
        const acl = await getACL('myorg');
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/myorg`);
        expect(acl).toBeInstanceOf(ACL);
        expect(acl).toMatchSnapshot();
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
    describe('getAcl()', () => {
      beforeEach(() => {
        mockResponse(JSON.stringify(mockListACLResponse));
      });
      afterEach(() => {
        resetMocks();
      });
      it('should make a GET request and return a PaginatedList of ACL', async () => {
        const listOfACLs = await listACL('myorg');
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/myorg/*`);
        expect(listOfACLs.total).toEqual(2);
        expect(listOfACLs.results).toMatchSnapshot();
      });
    });
  });
});
