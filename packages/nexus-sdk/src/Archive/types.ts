export type ArchivePayload = {
  resources: {
    resourceId?: string;
    project?: string;
    '@type': string;
    tag?: string;
    rev?: number;
    originalSource?: boolean;
    path?: string;
  }[];
};
