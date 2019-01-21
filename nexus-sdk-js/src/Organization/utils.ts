import Organization, {
  OrgResponse,
  ListOrgsResponse,
  ListOrgsOptions,
  OrgPayload,
} from '.';
import { ListProjectsResponse } from '../Project';
import { httpPut, httpGet, httpDelete } from '../utils/http';
import { CreateOrganizationException } from './exceptions';

/**
 *
 * @param label The label of your organization
 * @param name The name of your organization
 */
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
/**
 *
 * @param orgLabel The organization label to fetch
 * @param Object<revision, tag> The specific tag OR revision to fetch
 */
export async function getOrganization(
  orgLabel: string,
  options?: { revision?: number; tag?: string },
): Promise<Organization> {
  try {
    // check if we have options
    let ops = '';
    if (options) {
      // it's rev or tag, not both. We take rev over tag
      if (options.revision) {
        ops = `?rev=${options.revision}`;
      } else if (options.tag) {
        ops = `?tag=${options.tag}`;
      }
    }
    const orgResponse: OrgResponse = await httpGet(`/orgs/${orgLabel}${ops}`);
    // we want to know how many projects there are per organization
    const listProjectsResponse: ListProjectsResponse = await httpGet(`/orgs/${orgLabel}`);
    const projectNumber: number = listProjectsResponse._total;

    const org = new Organization({ ...orgResponse, projectNumber });
    return org;
  } catch (e) {
    throw new Error(`ListOrgsError: ${e}`);
  }
}

export async function listOrganizations(
  options?: ListOrgsOptions,
): Promise<Organization[]> {
  let ops = '';
  if (options) {
    ops = Object.keys(options).reduce(
      (currentOps, key) =>
        currentOps.length === 0
          ? `?${key}=${options[key]}`
          : `${currentOps}&${key}=${options[key]}`,
      '',
    );
  }
  try {
    const listOrgsResponse: ListOrgsResponse = await httpGet(`/orgs${ops}`);
    if (listOrgsResponse.code || !listOrgsResponse._results) {
      return [];
    }

    const orgs: Organization[] = listOrgsResponse._results.map(
      (response: OrgResponse) => new Organization({...response, projectNumber: 0} as OrgPayload)
    );

    return orgs;
  } catch (e) {
    throw new Error(`ListOrgsError: ${e}`);
  }
}

/**
 *
 * @param orgLabel Current organization label
 * @param rev Last known revision
 * @param newName Knew name the organization will be called with
 */
export async function updateOrganization(
  orgLabel: string,
  rev: number = 1,
  newName: string,
): Promise<Organization> {
  try {
    const orgResponse: OrgResponse = await httpPut(
      `/orgs/${orgLabel}?rev=${rev}`,
      {
        name: newName,
      },
    );
    return new Organization(orgResponse);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 *
 * @param orgLabel Current organization label
 * @param rev Last know revision
 * @param Object<{tagName, revision}> The name of the tag and revision number to tag the organization from
 */
export async function tagOrganization(
  orgLabel: string,
  rev: number = 1,
  {
    tagName,
    tagFromRev,
  }: {
    tagName: string;
    tagFromRev: number;
  },
): Promise<Organization> {
  try {
    const orgResponse: OrgResponse = await httpPut(
      `/orgs/${orgLabel}/tags?rev=${rev}`,
      {
        tag: tagName,
        rev: tagFromRev,
      },
    );
    return new Organization(orgResponse);
  } catch (error) {
    throw new Error(error);
  }
}

/**
 *
 * @param orgLabel Label of the Org to be deprecated
 * @param rev Last know revision
 */
export async function deprecateOrganization(
  orgLabel: string,
  rev: number = 1,
): Promise<Organization> {
  try {
    const orgResponse: OrgResponse = await httpDelete(
      `/orgs/${orgLabel}?rev=${rev}`,
    );
    return new Organization(orgResponse);
  } catch (error) {
    throw new Error(error);
  }
}
