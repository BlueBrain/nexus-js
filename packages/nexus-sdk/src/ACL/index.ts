import { toPromise, Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import { ACLList, ListACLOptions, ACLPayload, ACL } from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams, removeLeadingSlash } from '../utils';

const Resolver = (
  { httpGet, httpPut, httpPatch, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    list: (path?: string, options?: ListACLOptions): Promise<ACLList> => {
      const opts = buildQueryParams(options);
      return toPromise(
        httpGet({
          path: `${context.uri}/${context.version}/acls/${removeLeadingSlash(
            path,
          )}${opts}`,
        }),
      );
    },
    create: (path: string, payload: ACLPayload): Promise<ACL> =>
      toPromise(
        httpPut({
          path: `${context.uri}/${context.version}/acls/${removeLeadingSlash(
            path,
          )}`,
          body: JSON.stringify(payload),
        }),
      ),
    replace: (path: string, rev: number, payload: ACLPayload): Promise<ACL> =>
      toPromise(
        httpPut({
          path: `${context.uri}/${context.version}/acls/${removeLeadingSlash(
            path,
          )}?rev=${rev}`,
          body: JSON.stringify(payload),
        }),
      ),
    subtract: (path: string, rev: number, payload: ACLPayload): Promise<ACL> =>
      toPromise(
        httpPatch({
          path: `${context.uri}/${context.version}/acls/${removeLeadingSlash(
            path,
          )}?rev=${rev}`,
          body: JSON.stringify({ ...payload, '@type': 'Subtract' }),
        }),
      ),
    append: (path: string, rev: number, payload: ACLPayload): Promise<ACL> =>
      toPromise(
        httpPatch({
          path: `${context.uri}/${context.version}/acls/${removeLeadingSlash(
            path,
          )}?rev=${rev}`,
          body: JSON.stringify({ ...payload, '@type': 'Append' }),
        }),
      ),
    delete: (path: string, rev: number): Promise<ACL> =>
      toPromise(
        httpDelete({
          path: `${context.uri}/${context.version}/acls/${removeLeadingSlash(
            path,
          )}?rev=${rev}`,
        }),
      ),
    poll: (path: string, options?: ListACLOptions): Observable<ACLList> =>
      poll({
        path: `${context.uri}/${context.version}/acls/${removeLeadingSlash(
          path,
        )}${buildQueryParams(options)}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Resolver;
