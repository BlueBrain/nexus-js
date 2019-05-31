import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { ACLList, ListACLOptions, ACLPayload, ACL } from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams, removeLeadingSlash } from '../utils';

const ACL = (
  { httpGet, httpPut, httpPatch, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    list: (path?: string, options?: ListACLOptions): Promise<ACLList> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/acls/${removeLeadingSlash(path)}${opts}`,
      });
    },
    create: (path: string, payload: ACLPayload): Promise<ACL> =>
      httpPut({
        path: `${context.uri}/acls/${removeLeadingSlash(path)}`,
        body: JSON.stringify(payload),
      }),
    replace: (path: string, rev: number, payload: ACLPayload): Promise<ACL> =>
      httpPut({
        path: `${context.uri}/acls/${removeLeadingSlash(path)}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    subtract: (path: string, rev: number, payload: ACLPayload): Promise<ACL> =>
      httpPatch({
        path: `${context.uri}/acls/${removeLeadingSlash(path)}?rev=${rev}`,
        body: JSON.stringify({ ...payload, '@type': 'Subtract' }),
      }),
    append: (path: string, rev: number, payload: ACLPayload): Promise<ACL> =>
      httpPatch({
        path: `${context.uri}/acls/${removeLeadingSlash(path)}?rev=${rev}`,
        body: JSON.stringify({ ...payload, '@type': 'Append' }),
      }),
    delete: (path: string, rev: number): Promise<ACL> =>
      httpDelete({
        path: `${context.uri}/acls/${removeLeadingSlash(path)}?rev=${rev}`,
      }),
    poll: (path: string, options?: ListACLOptions): Observable<ACLList> =>
      poll({
        path: `${context.uri}/acls/${removeLeadingSlash(
          path,
        )}${buildQueryParams(options)}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default ACL;
