import ACL from '.';
import {
  ListACLResponse,
  ListACLOption,
  Identity,
  ACLPayload,
  IdentityResponse,
} from './types';
import { httpGet, httpPut, httpPatch, httpDelete } from '../utils/http';
import { buildQueryParams } from '../utils';
import { PaginatedList } from '../utils/types';

export async function listACL(
  path: string,
  options?: ListACLOption,
): Promise<PaginatedList<ACL>> {
  try {
    const opts = buildQueryParams(options);
    const aclListResponse: ListACLResponse = await httpGet(
      `/acls/${path}${opts}`,
    );

    const acls: ACL[] = aclListResponse._results.map(
      aclResponse =>
        new ACL({ ...aclResponse, '@context': aclListResponse['@context'] }),
    );
    return {
      total: aclListResponse._total,
      index: (options && options.from) || 1,
      results: acls,
    };
  } catch (error) {
    throw error;
  }
}

export async function createACL(
  path: string,
  payload: ACLPayload[],
): Promise<any> {
  try {
    const response = await httpPut(`/acls/${path}`, { acl: payload });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function replaceACL(
  path: string,
  rev: number,
  payload: ACLPayload[],
): Promise<any> {
  try {
    const response = await httpPut(`/acls/${path}?rev=${rev}`, {
      acl: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function subtractACL(
  path: string,
  rev: number,
  payload: ACLPayload[],
): Promise<any> {
  try {
    const response = await httpPatch(`/acls/${path}?rev=${rev}`, {
      '@type': 'Subtract',
      acl: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function appendACL(
  path: string,
  rev: number,
  payload: ACLPayload[],
): Promise<any> {
  try {
    const response = await httpPatch(`/acls/${path}?rev=${rev}`, {
      '@type': 'Append',
      acl: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteACL(path: string, rev: number): Promise<any> {
  try {
    const response = await httpDelete(`/acls/${path}?rev=${rev}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function listIdentities(): Promise<Identity[]> {
  try {
    const identityResponse: IdentityResponse = await httpGet('/identities');
    return identityResponse.identities;
  } catch (error) {
    throw error;
  }
}
