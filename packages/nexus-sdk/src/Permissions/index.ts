import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  Permissions,
  GetPermissionsOptions,
  PermissionsPayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';

const Organization = (
  { httpGet, httpPut, httpDelete, httpPatch, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (options?: GetPermissionsOptions): Promise<Permissions> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/permissions${opts}`,
      });
    },
    replace: (rev: number, payload: PermissionsPayload): Promise<Permissions> =>
      httpPut({
        path: `${context.uri}/permissions?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    subtract: (
      rev: number,
      payload: PermissionsPayload,
    ): Promise<Permissions> =>
      httpPatch({
        path: `${context.uri}/permissions?rev=${rev}`,
        body: JSON.stringify({ '@type': 'Subtract', permissions: payload }),
      }),
    append: (rev: number, payload: PermissionsPayload): Promise<Permissions> =>
      httpPatch({
        path: `${context.uri}/permissions?rev=${rev}`,
        body: JSON.stringify({ '@type': 'Append', permissions: payload }),
      }),
    delete: (rev: number): Promise<Permissions> =>
      httpDelete({
        path: `${context.uri}/permissions?rev=${rev}`,
      }),
    poll: (options?: { pollTime: number }): Observable<Permissions> =>
      poll({
        path: `${context.uri}/permissions`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Organization;
