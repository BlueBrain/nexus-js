import { resetMocks, mock, mockResponse, mockResponses } from 'jest-fetch-mock';
import Nexus from '..';
import { mockOrgResponse, mockListProjectResponse } from '../__mocks__/helpers';
import Organization from '../Organization';

const nexus = new Nexus({ environment: 'http://example.com' });
describe('Nexus class', () => {
  it('should create a Nexus instance', () => {
    expect(nexus).toBeInstanceOf(Nexus);
  });

  describe('get an Org', () => {
    afterEach(() => {
      resetMocks();
    });
    it('should return an organisation', async () => {
      mockResponses([JSON.stringify(mockOrgResponse)]);
      const org: Organization = await nexus.getOrganization('myorg');
      expect(mock.calls.length).toBe(1);
      expect(org).toBeInstanceOf(Organization);
      expect(org.label).toEqual('myorg');
    });
  });

  describe('list a list of Org', () => {
    afterEach(() => {
      resetMocks();
    });
    it('should return a list of organisations', async () => {
      mockResponses([JSON.stringify(mockListProjectResponse)]);
      const orgs: Organization[] = await nexus.listOrganizations();
      expect(mock.calls.length).toBe(1);
      expect(orgs.length).toEqual(1);
    });
  });
});
