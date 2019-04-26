import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Nexus from '..';
import {
  mockOrgResponse,
  mockListProjectResponse,
  mockProjectResponse,
  mockResourceResponse,
} from '../__mocks__/helpers';
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
    beforeAll(() => {
      fetchMock.mockResponses(
        [JSON.stringify(mockOrgResponse), { status: 200 }],  // Org
        [JSON.stringify(mockProjectResponse), { status: 200 }],  // Project
        [JSON.stringify(mockResourceResponse), { status: 200 }],  // Resource
      );
    });
    afterAll(() => {
      fetchMock.resetMocks();
    });
    it('should create a Nexus instance', () => {
      expect(nexus).toBeInstanceOf(Nexus);
    });
    it('should call Org method with instance store', async () => {
      await nexus.Organization.get('myorg');
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `http://example.com/orgs/myorg`,
      );
      expect(fetchMock.mock.calls[0][1].headers.get(['Authorization'])).toEqual(
        'Bearer user1',
      );
    });
    it('should call Project method with instance store', async () => {
      await nexus.Project.get('myorg', 'myproject');
      expect(fetchMock.mock.calls[1][0]).toEqual(
        `http://example.com/projects/myorg/myproject`,
      );
      expect(fetchMock.mock.calls[1][1].headers.get(['Authorization'])).toEqual(
        'Bearer user1',
      );
    });
    it('should call Resource method with instance store', async () => {
      await nexus.Resource.get('myorg', 'myproject', 'myschema', 'myresource');
      expect(fetchMock.mock.calls[2][0]).toEqual(
        `http://example.com/resources/myorg/myproject/myschema/myresource`,
      );
      expect(fetchMock.mock.calls[2][1].headers.get(['Authorization'])).toEqual(
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
