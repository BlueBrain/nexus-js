import { Resource, PaginatedResource } from '../types';

export type StorageType = 'DiskStorage' | 'RemoteDiskStorage' | 'S3Storage';

export type Storage = {};
export type DiskStorage = Resource & {};
export type RemoteDiskStorage = Resource & {};
export type S3Storage = Resource & {};
export type StorageList = PaginatedResource<Storage>;

export type GetStorageOptions = {
  rev?: number;
  tag?: string;
};
export type ListStorageOptions = {
  from?: number;
  size?: number;
  deprecated?: boolean;
  rev?: number;
  type?: StorageType;
  createdBy?: string;
  updatedBy?: string;
};

export type StoragePayload =
  | DiskStoragePayload
  | RemoteDiskStoragePayload
  | S3StoragePayload;

export type DiskStoragePayload = {
  '@id': string;
  '@tpye': ['DiskStorage'];
  volume: string;
  default?: boolean;
  readPermissions?: string[];
  writePermissions?: string[];
};

export type RemoteDiskStoragePayload = {
  '@id': string;
  '@type': ['RemoteDiskStorage'];
  folder: string;
  default?: boolean;
  endpoint?: string;
  credentials: string;
  readPermissions?: string[];
  writePermissions?: string[];
};

export type S3StoragePayload = {
  '@id': string;
  '@type': ['S3Storage'];
  bucket: string;
  default?: boolean;
  endpoint?: string;
  accessKey?: string;
  secretKey?: string;
  readPermissions?: string[];
  writePermissions?: string[];
};
