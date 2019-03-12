import { GlobalWithFetchMock } from 'jest-fetch-mock';
import Organization from '../';
import { mockListOrgResponse, mockOrgResponse } from '../../__mocks__/helpers';
import {
  getOrganization,
  updateOrganization,
  deprecateOrganization,
  listOrganizations,
} from '../utils';
import { Nexus } from '../..';

const { fetchMock } = <GlobalWithFetchMock>global;

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);
const org = new Organization(mockOrgResponse);
describe('Organization class', () => {
  it('should create an Org instance', () => {
    expect(org).toBeInstanceOf(Organization);
    expect(org.label).toEqual(mockOrgResponse._label);
  });

  describe('get an org', () => {
    beforeEach(() => {
      fetchMock.mockResponses([JSON.stringify(mockOrgResponse), {status: 200}]);
    });
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('set the rev option', async () => {
      await getOrganization('myorg', { rev: 12 });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/orgs/myorg?rev=12`);
    });
  });

  describe('list orgs', () => {
    beforeEach(() => {
      fetchMock.mockResponses([JSON.stringify(mockListOrgResponse), {status: 200}]);
    });
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('call the expected URL', async () => {
      await listOrganizations();
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/orgs`);
    });
    it('set size option', async () => {
      await listOrganizations({ size: 12 });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/orgs?size=12`);
    });
    it('set deprecated option', async () => {
      await listOrganizations({ deprecated: true });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/orgs?deprecated=true`);
    });
    it('set from option', async () => {
      await listOrganizations({ from: 3 });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/orgs?from=3`);
    });
    it('set full_text_search option', async () => {
      await listOrganizations({ full_text_search: 'some_search with spaces' });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/orgs?full_text_search=some_search%20with%20spaces`,
      );
    });
    it('set all options', async () => {
      await listOrganizations({
        full_text_search: 'some_search with spaces',
        size: 12,
        deprecated: true,
        from: 3,
      });
      expect(fetchMock.mock.calls[0][0]).toEqual(
        `${baseUrl}/orgs?full_text_search=some_search%20with%20spaces&size=12&deprecated=true&from=3`,
      );
    });
  });

  describe('update an org', () => {
    beforeEach(() => {
      fetchMock.mockResponses([JSON.stringify(mockOrgResponse), {status: 200}]);
    });
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('updates the specific revision', async () => {
      updateOrganization('myorg', 12, { description: 'my new description' });
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/orgs/myorg?rev=12`);
      expect(fetchMock.mock.calls[0][1].body).toEqual(
        JSON.stringify({ description: 'my new description' }),
      );
    });
  });

  describe('deprecate an org', () => {
    beforeEach(() => {
      fetchMock.mockResponses([JSON.stringify(mockOrgResponse), {status: 200}]);
    });
    afterEach(() => {
      fetchMock.resetMocks();
    });
    it('updates the specific revision', async () => {
      deprecateOrganization('myorg', 12);
      expect(fetchMock.mock.calls[0][0]).toEqual(`${baseUrl}/orgs/myorg?rev=12`);
    });
  });
});
