import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  GetStorageOptions,
  ListStorageOptions,
  StorageList,
  StoragePayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';

const Storage = (
  { httpGet, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      storageId: string,
      options?: GetStorageOptions,
    ): Promise<Storage> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${
          context.uri
        }/storages/${orgLabel}/${projectLabel}/${storageId}${opts}`,
      });
    },
    list: (
      orgLabel?: string,
      options?: ListStorageOptions,
    ): Promise<StorageList> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/storages/${orgLabel}${opts}`,
      });
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: StoragePayload,
    ): Promise<Storage> =>
      httpPut({
        path: `${context.uri}/storages/${orgLabel}/${projectLabel}`,
        body: JSON.stringify(payload),
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      storageId: string,
      rev: number,
      payload: StoragePayload,
    ): Promise<Storage> =>
      httpPut({
        path: `${
          context.uri
        }/storages/${orgLabel}/${projectLabel}/${storageId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      storageId: string,
      rev: number,
    ): Promise<Storage> =>
      httpDelete({
        path: `${
          context.uri
        }/storages/${orgLabel}/${projectLabel}/${storageId}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      storageId: string,
      options?: { pollTime: number },
    ): Observable<Storage> =>
      poll({
        path: `${
          context.uri
        }/storages/${orgLabel}/${projectLabel}/${storageId}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Storage;
