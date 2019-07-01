import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  Realm,
  ListRealmOptions,
  RealmList,
  GetRealmOptions,
  RealmPayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';

const Realm = (
  { httpGet, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (realmLabel: string, options?: GetRealmOptions): Promise<Realm> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/realms/${realmLabel}${opts}`,
      });
    },
    list: (options?: ListRealmOptions): Promise<RealmList> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/realms${opts}`,
      });
    },
    create: (realmLabel: string, payload: RealmPayload): Promise<Storage> =>
      httpPut({
        path: `${context.uri}/realms/${realmLabel}`,
        body: JSON.stringify(payload),
      }),
    update: (
      realmLabel: string,
      rev: number,
      payload: RealmPayload,
    ): Promise<Storage> =>
      httpPut({
        path: `${context.uri}/realms/${realmLabel}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (realmLabel: string, rev: number): Promise<Storage> =>
      httpDelete({
        path: `${context.uri}/realms/${realmLabel}?rev=${rev}`,
      }),
    poll: (
      realmLabel: string,
      options?: GetRealmOptions & { pollIntervalMs: number },
    ): Observable<Storage> => {
      const { pollIntervalMs, ...getRealmOptions } = options;
      return poll({
        path: `${context.uri}/realms/${realmLabel}${buildQueryParams(
          getRealmOptions,
        )}`,
        context: { pollIntervalMs: options && options.pollIntervalMs | 1000 },
      });
    },
  };
};

export default Realm;
