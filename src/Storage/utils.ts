import { StorageList, ListStorageOptions } from './types';
import { httpGet } from '../utils/http';
import { buildQueryParams } from '../utils';

export const list = (
  orgLabel: string,
  projectLabel: string,
  options?: ListStorageOptions,
): Promise<StorageList> => {
  const opts = buildQueryParams(options);
  return httpGet(`/storages/${orgLabel}/${projectLabel}${opts}`);
};
