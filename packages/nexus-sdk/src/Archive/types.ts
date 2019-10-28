import { Resource } from '../types';
export type ArchivePayload = {
  archiveId?: string;
  resources: {
    '@type': string;
    resourceId?: string;
    project?: string;
    path?: string;
    originalSource?: boolean;
    rev?: number;
    tag?: string;
  }[];
};

export type Archive = Resource & {
  '@type': 'Archive';
  resources: {
    '@type': string;
    resourceId?: string;
    project?: string;
    path?: string;
    originalSource?: boolean;
    rev?: number;
    tag?: string;
  }[];
};

export type GetArchiveOptions = {
  [key: string]: string;
  format?: 'compacted' | 'expanded';
  as?: 'json' | 'x-tar';
};
