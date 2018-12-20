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
      mockResponses(
        [JSON.stringify(mockOrgResponse)],
        [JSON.stringify(mockListProjectResponse)],
      );
      const org: Organization = await nexus.getOrganization('myorg');
      expect(mock.calls.length).toBe(2);
      expect(org).toBeInstanceOf(Organization);
      expect(org.label).toEqual('myorg');
      expect(org.projectNumber).toEqual(2);
    });
  });

  describe('list a list of Org', () => {
    afterEach(() => {
      resetMocks();
    });
    it('should return a list of organisations', async () => {
      mockResponses(
        [JSON.stringify(mockListProjectResponse)],
        [JSON.stringify(mockOrgResponse)],
        [JSON.stringify(mockOrgResponse)],
      );
      const orgs: Organization[] = await nexus.listOrganizations();
      expect(mock.calls.length).toBe(3);
      expect(orgs.length).toEqual(1);
    });
  });
});
