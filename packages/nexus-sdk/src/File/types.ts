import { GetResourceOptions, Resource } from '../Resource/types';
import { FetchAsValues } from '@bbp/nexus-link';
export type NexusFile = Resource & {
  '@type': 'File';
  _bytes: number;
  _digest: {
    _algorithm: string;
    _value: string;
  };
  _filename: string;
  _mediaType: string;
};

export type GetFileOptions = GetResourceOptions & {
  as?: FetchAsValues;
};
