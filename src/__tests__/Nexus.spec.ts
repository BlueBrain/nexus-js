import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Nexus from '..';
import { mockOrgResponse, mockListProjectResponse } from '../__mocks__/helpers';
import Organization from '../Organization';
import { PaginatedList } from '../utils/types';

const { fetchMock } = <GlobalWithFetchMock>global;

const nexus = new Nexus({ environment: 'http://example.com' });
describe('Nexus class', () => {
  it('should create a Nexus instance', () => {
    expect(nexus).toBeInstanceOf(Nexus);
  });

  describe('get an Org', () => {
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('should return an organisation', async () => {
      fetchMock.mockResponses([JSON.stringify(mockOrgResponse), {status: 200}]);
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
      fetchMock.mockResponses([JSON.stringify(mockListProjectResponse), {status: 200}]);
      const orgs: PaginatedList<Organization> = await nexus.listOrganizations();
      expect(fetchMock.mock.calls.length).toBe(1);
      expect(orgs.total).toEqual(1);
    });
  });
});
