import { Observable } from '@bbp/nexus-link';
import { Fetchers } from '../types';
import {
  GetStorageOptions,
  ListStorageOptions,
  StorageList,
  StoragePayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildHeader, buildQueryParams } from '../utils';
import { Resource } from '../Resource/types';

const Storage = (
  { httpGet, httpPut, httpDelete, httpPost, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      storageId: string,
      options?: GetStorageOptions,
    ): Promise<Storage> => {
      const { as = 'json', ...opts } = options || {};
      return httpGet({
        headers: { Accept: buildHeader(as) },
        path: `${
          context.uri
        }/storages/${orgLabel}/${projectLabel}/${storageId}${buildQueryParams(
          opts,
        )}`,
      });
    },
    list: (
      orgLabel: string,
      projectLabel: string,
      options?: ListStorageOptions,
    ): Promise<StorageList> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/storages/${orgLabel}/${projectLabel}${opts}`,
      });
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: StoragePayload,
    ): Promise<Resource> =>
      httpPost({
        path: `${context.uri}/storages/${orgLabel}/${projectLabel}`,
        body: JSON.stringify(payload),
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      storageId: string,
      rev: number,
      payload: StoragePayload,
    ): Promise<Resource> =>
      httpPut({
        path: `${context.uri}/storages/${orgLabel}/${projectLabel}/${storageId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    tag: (
      orgLabel: string,
      projectLabel: string,
      storageId: string,
      rev: number,
      payload: {
        tag: string;
        rev: number;
      },
    ): Promise<Resource> =>
      httpPost({
        path: `${context.uri}/storages/${orgLabel}/${projectLabel}/${storageId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      storageId: string,
      rev: number,
    ): Promise<Resource> =>
      httpDelete({
        path: `${context.uri}/storages/${orgLabel}/${projectLabel}/${storageId}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      storageId: string,
      options?: { pollTime: number },
    ): Observable<Storage> =>
      poll({
        path: `${context.uri}/storages/${orgLabel}/${projectLabel}/${storageId}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Storage;
