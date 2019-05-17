import { StorageList } from './types';
import { httpGet } from '../utils/http';

export const list = (
  orgLabel: string,
  projectLabel: string,
): Promise<StorageList> => httpGet(`/storages/${orgLabel}/${projectLabel}`);
