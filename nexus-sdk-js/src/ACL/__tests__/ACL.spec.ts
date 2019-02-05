import Nexus from '../../Nexus';
import { resetMocks, mockResponse, mock } from 'jest-fetch-mock';
import {
  mockListACLResponse,
  mockACLOperationSuccess,
  mockIdentitiesResponse,
} from '../__mocks__/mockResponses';
import {
  listACL,
  createACL,
  replaceACL,
  subtractACL,
  appendACL,
  deleteACL,
  listIdentities,
} from '../utils';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('ACL utils', () => {
  describe('utils()', () => {
    describe('listACL()', () => {
      beforeEach(() => {
        mockResponse(JSON.stringify(mockListACLResponse));
      });
      afterEach(() => {
        resetMocks();
      });
      it('should make a GET request and return a PaginatedList of ACL', async () => {
        const listOfACLs = await listACL('myorg/*');
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/myorg/*`);
        expect(listOfACLs.total).toEqual(2);
        expect(listOfACLs.results).toMatchSnapshot();
      });
      it('should make a GET request with rev query param', async () => {
        await listACL('myorg', { rev: 12 });
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/myorg?rev=12`);
      });
      it('should make a GET request with self query param', async () => {
        await listACL('myorg', { self: true });
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/myorg?self=true`);
      });
      it('should make a GET request with ancestor query param', async () => {
        await listACL('myorg', { ancestors: true });
        expect(mock.calls[0][0]).toEqual(
          `${baseUrl}/acls/myorg?ancestors=true`,
        );
      });
      it('should make a GET request with pagination query param', async () => {
        await listACL('myorg', { from: 2, size: 3 });
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/myorg?from=2&size=3`);
      });
      it('should make a GET request with all query params', async () => {
        await listACL('myorg', { rev: 34, ancestors: true, self: true });
        expect(mock.calls[0][0]).toEqual(
          `${baseUrl}/acls/myorg?rev=34&ancestors=true&self=true`,
        );
      });
    });
    describe('createACL()', () => {
      beforeEach(() => {
        mockResponse(JSON.stringify(mockACLOperationSuccess));
      });
      afterEach(() => {
        resetMocks();
      });
      it('should make a PUT request', async () => {
        const acls = [
          {
            permissions: ['project/read'],
            identity: { realm: 'github', group: 'asd' },
          },
        ];
        await createACL('my/path/', acls);
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/my/path/`);
        expect(mock.calls[0][1].method).toEqual('PUT');
        expect(mock.calls[0][1].body).toEqual(JSON.stringify({ acl: acls }));
      });
    });
    describe('replaceACL()', () => {
      beforeEach(() => {
        mockResponse(JSON.stringify(mockACLOperationSuccess));
      });
      afterEach(() => {
        resetMocks();
      });
      it('should make a PUT request', async () => {
        const acls = [
          {
            permissions: ['project/read'],
            identity: { realm: 'github', group: 'asd' },
          },
        ];
        await replaceACL('my/path/', 2, acls);
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/my/path/?rev=2`);
        expect(mock.calls[0][1].method).toEqual('PUT');
        expect(mock.calls[0][1].body).toEqual(JSON.stringify({ acl: acls }));
      });
    });
    describe('subtractACL()', () => {
      beforeEach(() => {
        mockResponse(JSON.stringify(mockACLOperationSuccess));
      });
      afterEach(() => {
        resetMocks();
      });
      it('should make a PATCH request', async () => {
        const acls = [
          {
            permissions: ['project/read'],
            identity: { realm: 'github', group: 'asd' },
          },
        ];
        await subtractACL('my/path/', 2, acls);
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/my/path/?rev=2`);
        expect(mock.calls[0][1].method).toEqual('PATCH');
        expect(mock.calls[0][1].body).toEqual(
          JSON.stringify({ '@type': 'Subtract', acl: acls }),
        );
      });
    });
    describe('appendACL()', () => {
      beforeEach(() => {
        mockResponse(JSON.stringify(mockACLOperationSuccess));
      });
      afterEach(() => {
        resetMocks();
      });
      it('should make a PATCH request', async () => {
        const acls = [
          {
            permissions: ['project/read'],
            identity: { realm: 'github', group: 'asd' },
          },
        ];
        await appendACL('my/path/', 2, acls);
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/my/path/?rev=2`);
        expect(mock.calls[0][1].method).toEqual('PATCH');
        expect(mock.calls[0][1].body).toEqual(
          JSON.stringify({ '@type': 'Append', acl: acls }),
        );
      });
    });
    describe('deleteACL()', () => {
      beforeEach(() => {
        mockResponse(JSON.stringify(mockACLOperationSuccess));
      });
      afterEach(() => {
        resetMocks();
      });
      it('should make a DELETE request', async () => {
        await deleteACL('my/path/', 2);
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/acls/my/path/?rev=2`);
        expect(mock.calls[0][1].method).toEqual('DELETE');
      });
    });
    describe('listIdentities()', () => {
      beforeEach(() => {
        mockResponse(JSON.stringify(mockIdentitiesResponse));
      });
      afterEach(() => {
        resetMocks();
      });
      it('should return a list of Identities', async () => {
        const indetities = await listIdentities();
        expect(mock.calls[0][0]).toEqual(`${baseUrl}/identities`);
        expect(indetities).toMatchSnapshot();
      });
    });
  });
});
