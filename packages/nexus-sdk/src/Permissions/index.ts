import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  Permissions,
  GetPermissionsOptions,
  PermissionsPayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';

const Permissions = (
  { httpGet, httpPut, httpDelete, httpPatch, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    list: (options?: GetPermissionsOptions): Promise<Permissions> => {
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
        body: JSON.stringify({ ...payload, '@type': 'Subtract' }),
      }),
    append: (rev: number, payload: PermissionsPayload): Promise<Permissions> =>
      httpPatch({
        path: `${context.uri}/permissions?rev=${rev}`,
        body: JSON.stringify({ ...payload, '@type': 'Append' }),
      }),
    delete: (rev: number): Promise<Permissions> =>
      httpDelete({
        path: `${context.uri}/permissions?rev=${rev}`,
      }),
    poll: (
      options?: GetPermissionsOptions & { pollIntervalMs: number },
    ): Observable<Permissions> => {
      const { pollIntervalMs, ...getPermissionsOptions } = options;
      return poll({
        path: `${context.uri}/permissions${buildQueryParams(
          getPermissionsOptions,
        )}`,
        context: { pollIntervalMs: options && options.pollIntervalMs | 1000 },
      });
    },
  };
};

export default Permissions;
