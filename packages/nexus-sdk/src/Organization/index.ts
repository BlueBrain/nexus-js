import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  Organization,
  OrganizationList,
  ListOrgOptions,
  GetOrgOptions,
  OrgPayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';

const Organization = (
  { httpGet, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (label: string, options?: GetOrgOptions): Promise<Organization> =>
      httpGet({
        path: `${context.uri}/orgs/${label}${buildQueryParams(options)}`,
      }),
    list: (options?: ListOrgOptions): Promise<OrganizationList> => {
      const opts = buildQueryParams(options);
      return httpGet({ path: `${context.uri}/orgs${opts}` });
    },
    create: (label: string, payload: OrgPayload): Promise<any> =>
      httpPut({
        path: `${context.uri}/orgs/${label}`,
        body: JSON.stringify(payload),
      }),
    update: (label: string, rev: number, payload: OrgPayload): Promise<any> =>
      httpPut({
        path: `${context.uri}/orgs/${label}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (label: string, rev: number): Promise<any> =>
      httpDelete({
        path: `${context.uri}/orgs/${label}?rev=${rev}`,
      }),
    poll: (
      label: string,
      options?: { pollTime: number },
    ): Observable<Organization> =>
      poll({
        path: `${context.uri}/orgs/${label}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Organization;
