export interface StorageCommon {
  '@id': string;
  '@type': string | string[];
  _self: string;
  _constrainedBy: string;
  _project: string;
  _rev: number;
  _deprecated: boolean;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
}

export interface Storage extends StorageCommon {
  '@context': string | string[];
}

export interface StorageList {
  '@context': string | string[];
  _total: number;
  _results: StorageCommon[];
  _next: string;
}

export interface GetStorageOptions {
  rev?: number;
  tag?: string;
  [key: string]: any;
}

export interface ListStorageOptions {
  from?: number;
  size?: number;
  deprecated?: boolean;
  rev?: number;
  type?: string;
  createdBy?: string;
  updatedBy?: string;
  [key: string]: any;
}
