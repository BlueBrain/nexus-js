import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Nexus from '..';
import { mockOrgResponse, mockListProjectResponse } from '../__mocks__/helpers';
import Organization from '../Organization';
import { PaginatedList } from '../utils/types';
import store from '../store';

const { fetchMock } = <GlobalWithFetchMock>global;

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);
Nexus.setToken('global');
const nexus = new Nexus({ environment: 'http://example.com', token: 'user1' });

describe('Nexus class', () => {
  describe('static methods', () => {
    it('should set the environment globally on the global store', () => {
      const spy = jest.spyOn(store, 'update');
      Nexus.setEnvironment('http://env.com');
      expect(store.update).toHaveBeenCalled();
      spy.mockClear();
    });
    it('should set the token globally on the global store', () => {
      const spy = jest.spyOn(store, 'update');
      Nexus.setToken('blraaa');
      expect(store.update).toHaveBeenCalled();
      spy.mockClear();
    });
    it('should set the token globally on the global store', () => {
      const spy = jest.spyOn(store, 'update');
      Nexus.removeToken();
      expect(store.update).toHaveBeenCalled();
      spy.mockClear();
    });
    it('should throw an invalid token error', () => {
      // @ts-ignore
      expect(() => Nexus.setToken()).toThrowError('Token is invalid');
    });
  });
  describe('instance methods', () => {
    beforeEach(() => {
      fetchMock.mockResponses([JSON.stringify('{}'), { status: 200 }]);
    });
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('should create a Nexus instance', () => {
      expect(nexus).toBeInstanceOf(Nexus);
    });
    it('should call Org method with instance store', async () => {
      await nexus.Organization.get('lol');
      expect(fetchMock.mock.calls[0][0]).toEqual(`http://example.com/orgs/lol`);
      expect(fetchMock.mock.calls[0][1].headers.get(['Authorization'])).toEqual(
        'Bearer user1',
      );
    });
  });
  describe('get an Org', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('should return an organisation', async () => {
      fetchMock.mockResponses([
        JSON.stringify(mockOrgResponse),
        { status: 200 },
      ]);
      const org: Organization = await nexus.getOrganization('myorg');
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(org).toBeInstanceOf(Organization);
      expect(org.label).toEqual('myorg');
    });
  });

  describe('list a list of Org', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('should return a list of organisations', async () => {
      fetchMock.mockResponses([
        JSON.stringify(mockListProjectResponse),
        { status: 200 },
      ]);
      const orgs: PaginatedList<Organization> = await nexus.listOrganizations();
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(orgs.total).toEqual(1);
    });
  });
});
