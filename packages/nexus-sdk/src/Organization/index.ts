import { toPromise, Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  Organization,
  OrganizationList,
  ListOrgOptions,
  CreateOrgPayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';

const Organization = (
  { httpGet, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (label: string): Promise<Organization> =>
      toPromise(
        httpGet({
          path: `${context.uri}/${context.version}/orgs/${label}`,
        }),
      ),
    list: (options?: ListOrgOptions): Promise<OrganizationList> => {
      const opts = buildQueryParams(options);
      return toPromise(
        httpGet({ path: `${context.uri}/${context.version}/orgs${opts}` }),
      );
    },
    create: (label: string, payload: CreateOrgPayload): Promise<any> =>
      toPromise(
        httpPut({
          path: `${context.uri}/${context.version}/orgs/${label}`,
          body: JSON.stringify(payload),
        }),
      ),
    update: (
      label: string,
      rev: number,
      payload: CreateOrgPayload,
    ): Promise<any> =>
      toPromise(
        httpPut({
          path: `${context.uri}/${context.version}/orgs/${label}?rev=${rev}`,
          body: JSON.stringify(payload),
        }),
      ),
    deprecate: (label: string, rev: number): Promise<any> =>
      toPromise(
        httpDelete({
          path: `${context.uri}/${context.version}/orgs/${label}?rev=${rev}`,
        }),
      ),
    poll: (
      label: string,
      options?: { pollTime: number },
    ): Observable<Organization> =>
      poll({
        path: `${context.uri}/${context.version}/orgs/${label}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Organization;
