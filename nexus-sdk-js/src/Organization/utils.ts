import { Resource, Organization } from '..';
import { OrgResponse, ListOrgsResponse } from '.';
import { httpPut, httpGet } from '../utils/http';
import { CreateOrganizationException } from './exceptions';

export async function createOrganization(
  label: string,
  name: string,
): Promise<Organization> {
  try {
    const orgResponse: OrgResponse = await httpPut(`/orgs/${label}`, {
      name,
    });
    return new Organization({
      ...orgResponse,
      projectNumber: 0,
      _deprecated: false,
    });
  } catch (error) {
    throw new CreateOrganizationException(error.message);
  }
}

// TODO: refactor -> blocked by https://github.com/BlueBrain/nexus/issues/112
export async function getOrganization(name: string): Promise<Organization> {
  try {
    const orgResponse: OrgResponse = await httpGet(`/orgs/${name}`);
    // we want to know how many projects there are per organisation
    const listOrgsResponse: ListOrgsResponse = await httpGet('/projects');
    const projectNumber: number = listOrgsResponse._results
      ? listOrgsResponse._results.reduce((prev, org) => {
          const split = org._id.split('/');
          const orgName = split.slice(split.length - 2, split.length - 1)[0];
          if (orgName === name) {
            return prev + 1;
          }
          return prev;
        }, 0)
      : 0;

    const org = new Organization({ ...orgResponse, projectNumber });
    return org;
  } catch (e) {
    throw new Error(`ListOrgsError: ${e}`);
  }
}

// TODO: refactor -> blocked by https://github.com/BlueBrain/nexus/issues/112
export async function listOrganizations(): Promise<Organization[]> {
  try {
    const listOrgsResponse: ListOrgsResponse = await httpGet('/projects');
    if (listOrgsResponse.code || !listOrgsResponse._results) {
      return [];
    }
    // Get list of unique orgs names
    const filteredOrgNames: string[] = listOrgsResponse._results
      .map(org => {
        const split = org._id.split('/');
        const orgName = split.slice(split.length - 2, split.length - 1)[0];
        return orgName;
      })
      .filter((org, index, self) => self.indexOf(org) === index);

    // get orgs details
    return Promise.all(
      filteredOrgNames.map(async org => await getOrganization(org)),
    );
  } catch (e) {
    throw new Error(`ListOrgsError: ${e}`);
  }
}
