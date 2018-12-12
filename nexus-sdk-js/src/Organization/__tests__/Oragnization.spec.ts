import Organization, { OrgResponse } from '../';

const mockOrgResponse: OrgResponse = {
  '@context': '',
  '@id': '',
  '@type': '',
  _deprecated: false,
  _rev: 1,
  _uuid: '',
  label: 'myorg',
  name: 'My Org',
  projectNumber: 12,
};

describe('Organization class', () => {
  it('should create an Org instance', () => {
    const org = new Organization(mockOrgResponse);
    expect(org.name).toEqual(mockOrgResponse.name);
  });
});
