import { resetMocks, mock, mockResponses } from 'jest-fetch-mock';
import Organization from '../';
import {
  mockListProjectResponse,
  mockOrgResponse,
} from '../../__mocks__/helpers';
import {
  getOrganization,
  updateOrganization,
  tagOrganization,
  deprecateOrganization,
} from '../utils';
import Nexus from '../../Nexus';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);
const org = new Organization(mockOrgResponse);

describe('Organization class', () => {
  it('should create an Org instance', () => {
    expect(org).toBeInstanceOf(Organization);
    expect(org.name).toEqual(mockOrgResponse.name);
    expect(org.label).toEqual(mockOrgResponse.label);
    expect(org.projectNumber).toEqual(mockOrgResponse.projectNumber);
  });
  describe('static methods', () => {
    afterEach(() => {
      resetMocks();
    });
    it('should return an organisation', async () => {
      mockResponses(
        [JSON.stringify(mockOrgResponse)],
        [JSON.stringify(mockListProjectResponse)],
      );
      const org: Organization = await Organization.get('myorg');
      expect(mock.calls.length).toBe(2);
      expect(org).toBeInstanceOf(Organization);
      expect(org.label).toEqual('myorg');
      expect(org.projectNumber).toEqual(2);
    });
    it('should return a list of organisations', async () => {
      mockResponses(
        [JSON.stringify(mockListProjectResponse)],
        [JSON.stringify(mockOrgResponse)],
        [JSON.stringify(mockOrgResponse)],
      );
      const orgs: Organization[] = await Organization.list();
      expect(mock.calls.length).toBe(3);
      expect(orgs.length).toEqual(1);
    });
  });
  describe('get an org', () => {
    afterEach(() => {
      resetMocks();
    });
    it('set the rev option', async () => {
      getOrganization('myorg', { revision: 12 });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/orgs/myorg?rev=12`);
    });
    it('set the tag option', async () => {
      getOrganization('myorg', { tag: 'v1.0.0' });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/orgs/myorg?tag=v1.0.0`);
    });
    it('set the rev option over the tag one', async () => {
      getOrganization('myorg', { revision: 39, tag: 'v1.0.0' });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/orgs/myorg?rev=39`);
    });
  });
  describe('update an org', () => {
    afterEach(() => {
      resetMocks();
    });
    it('updates the specific revision', async () => {
      updateOrganization('myorg', 12, 'new name');
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/orgs/myorg?rev=12`);
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify({ name: 'new name' }),
      );
    });
    it('call with revision 1 by default', async () => {
      updateOrganization('myorg', undefined, 'new name');
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/orgs/myorg?rev=1`);
    });
  });
  describe('tag an org', () => {
    afterEach(() => {
      resetMocks();
    });
    it('updates the specific revision', async () => {
      tagOrganization('myorg', 12, { tagName: 'v1.0.0', tagFromRev: 10 });
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/orgs/myorg/tags?rev=12`);
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify({ tag: 'v1.0.0', rev: 10 }),
      );
    });
  });
  describe('deprecate an org', () => {
    afterEach(() => {
      resetMocks();
    });
    it('updates the specific revision', async () => {
      deprecateOrganization('myorg', 12);
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/orgs/myorg?rev=12`);
    });
  });
});
