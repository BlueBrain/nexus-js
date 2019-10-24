export type ArchivePayload = {
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
  format?: 'compacted' | 'expanded';
  as?: 'json' | 'text';
};
