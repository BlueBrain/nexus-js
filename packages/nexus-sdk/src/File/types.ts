import { GetResourceOptions, Resource } from '../Resource/types';

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
  as?: 'text' | 'blob' | 'document' | 'arraybuffer' | 'stream' | 'json';
};

export type FilePayload = {
  '@id'?: string;
  storage?: string;
  file: FormData;
};

export type CreateFileOptions = {
  extraHeaders?: { [key: string]: string };
};

export type UpdateFilePayload = FilePayload & {
  rev: string;
  [key: string]: string;
};

export type LinkFilePayload = {
  '@id'?: string;
  storage?: string;
  filename: string;
  path: string;
  mediaType: string;
};
