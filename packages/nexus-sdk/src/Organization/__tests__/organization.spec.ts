import Organization from '..';
import { mockFetchers } from '../../testUtils';
import { OrgPayload } from '../types';

const organization = Organization(mockFetchers, { uri: 'http://api.url/v1' });

describe('Organization', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('get', () => {
    it('should make httpGet call to the organizations api with the right url', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await organization.get('organizationLabel');
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/orgs/organizationLabel',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet call to the organizations api with the right url and query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await organization.get('organizationLabel', { rev: 1 });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/orgs/organizationLabel?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('list', () => {
    it('should make httpGet call to the organizations api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await organization.list();
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual('http://api.url/v1/orgs');
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });

    it('should make httpGet with query params', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await organization.list({
        deprecated: true,
      });
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/orgs?deprecated=true',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });

  describe('create', () => {
    it('should make httpPost call to the organizations api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: OrgPayload = {
        description: 'My organization',
      };
      await organization.create('organizationLabel', payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/orgs/organizationLabel',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('update', () => {
    it('should make httpPut call to the organizations api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      const payload: OrgPayload = {
        description: 'My organization',
      };
      await organization.update('organizationLabel', 1, payload);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/orgs/organizationLabel?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].body).toEqual(JSON.stringify(payload));
      expect(fetchMock.mock.calls[0][1].method).toEqual('PUT');
    });
  });

  describe('deprecate', () => {
    it('should make httpDELETE call to the organizations api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await organization.deprecate('organizationLabel', 1);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/orgs/organizationLabel?rev=1',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('DELETE');
    });
  });

  describe('poll', () => {
    xit('should make httpGet call to the organizations api', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({ data: '' }));
      await organization.poll('organizationLabel', { pollTime: 50 });
      console.log(fetchMock.mock.calls[0]);
      expect(fetchMock.mock.calls.length).toEqual(1);
      expect(fetchMock.mock.calls[0][0]).toEqual(
        'http://api.url/v1/orgs/organizationLabel',
      );
      expect(fetchMock.mock.calls[0][1].method).toEqual('GET');
    });
  });
});
