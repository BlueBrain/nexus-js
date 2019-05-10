import { toPromise, Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { Organization, OrganizationList } from './types';
import { NexusContext } from '../nexusSdk';

const Organization = (
  { httpGet, httpPut, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (label: string): Promise<Organization> =>
      toPromise(
        httpGet({
          path: `${context.uri}/${context.version}/orgs/${label}`,
        }),
      ),
    list: (): Promise<OrganizationList> =>
      toPromise(httpGet({ path: `${context.uri}/${context.version}/orgs` })),
    create: (label: string, payload: any): Promise<any> =>
      toPromise(
        httpPut({
          path: `${context.uri}/${context.version}/orgs/${label}`,
          body: payload,
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
