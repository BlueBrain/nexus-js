import { StorageList, ListStorageOptions, GetStorageOptions } from './types';
import { httpGet } from '../utils/http';
import { buildQueryParams } from '../utils';

export const get = (
  orgLabel: string,
  projectLabel: string,
  storageId: string,
  options?: GetStorageOptions,
): Promise<Storage> => {
  const opts = buildQueryParams(options);
  return httpGet(
    `/storages/${orgLabel}/${projectLabel}/${encodeURIComponent(
      storageId,
    )}${opts}`,
  );
};

export const list = (
  orgLabel: string,
  projectLabel: string,
  options?: ListStorageOptions,
): Promise<StorageList> => {
  const opts = buildQueryParams(options);
  return httpGet(`/storages/${orgLabel}/${projectLabel}${opts}`);
};
