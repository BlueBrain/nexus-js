import { resetMocks, mockResponse, mock, mockResponses } from 'jest-fetch-mock';
import Organization, { OrgResponse } from '../';
import Project from '../../Project';
import {
  mockProjectResponse,
  mockListProjectResponse,
  mockOrgResponse,
  mockListResourceResponse,
} from '../../__mocks__/helpers';
import {
  getOrganization,
  updateOrganization,
  tagOrganization,
  deprecateOrganization,
} from '../utils';
import { Nexus } from '../..';

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

  describe('get Project', () => {
    afterEach(() => {
      resetMocks();
    });
    it('should return a project', async () => {
      mockResponses(
        [JSON.stringify(mockProjectResponse)],
        [JSON.stringify(mockListResourceResponse)],
      );
      const project: Project = await org.getProject('project');
      expect(mock.calls.length).toBe(2);
      expect(project).toBeInstanceOf(Project);
      expect(project.id).toEqual(mockProjectResponse['@id']);
      expect(project.resourceNumber).toEqual(1);
    });
  });
  describe('list Projects', () => {
    afterEach(() => {
      resetMocks();
    });
    it('should return a list of projects', async () => {
      mockResponses(
        [JSON.stringify(mockListProjectResponse)],
        [JSON.stringify(mockProjectResponse)],
        [JSON.stringify(mockProjectResponse)],
        [JSON.stringify(mockListProjectResponse)],
        [JSON.stringify(mockListProjectResponse)],
      );
      const projects: Project[] = await org.listProjects();
      expect(mock.calls.length).toBe(5); // TODO: VERY BAD, wait after API refactor before addressing to backend team
      expect(projects.length).toEqual(2);
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
