import { toPromise, Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  Permissions,
  GetPermissionsOptions,
  PermissionsPayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';

const Organization = (
  { httpGet, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (options?: GetPermissionsOptions): Promise<Permissions> => {
      const opts = buildQueryParams(options);
      return toPromise(
        httpGet({
          path: `${context.uri}/${context.version}/permissions${opts}`,
        }),
      );
    },
    replace: (rev: number, payload: PermissionsPayload): Promise<Permissions> =>
      toPromise(
        httpPut({
          path: `${context.uri}/${context.version}/permissions?rev=${rev}`,
          body: JSON.stringify(payload),
        }),
      ),
    subtract: (
      rev: number,
      payload: PermissionsPayload,
    ): Promise<Permissions> =>
      toPromise(
        httpPut({
          path: `${context.uri}/${context.version}/permissions?rev=${rev}`,
          body: JSON.stringify({ '@type': 'Subtract', permissions: payload }),
        }),
      ),
    append: (rev: number, payload: PermissionsPayload): Promise<Permissions> =>
      toPromise(
        httpPut({
          path: `${context.uri}/${context.version}/permissions?rev=${rev}`,
          body: JSON.stringify({ '@type': 'Append', permissions: payload }),
        }),
      ),
    delete: (rev: number): Promise<Permissions> =>
      toPromise(
        httpDelete({
          path: `${context.uri}/${context.version}/permissions?rev=${rev}`,
        }),
      ),
    poll: (options?: { pollTime: number }): Observable<Permissions> =>
      poll({
        path: `${context.uri}/${context.version}/permissions`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Organization;
