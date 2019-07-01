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
      options?: GetOrgOptions & { pollIntervalMs: number },
    ): Observable<Organization> => {
      const { pollIntervalMs, ...getOrganizationOptions } = options;
      return poll({
        path: `${context.uri}/orgs/${label}${buildQueryParams(
          getOrganizationOptions,
        )}`,
        context: { pollIntervalMs: options && options.pollIntervalMs | 1000 },
      });
    },
  };
};

export default Organization;
