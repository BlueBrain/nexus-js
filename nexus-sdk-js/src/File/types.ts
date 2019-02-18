import { Context } from '../Resource/types';

export interface FileResponse {
  '@context': Context;
  '@id': string;
  '@type': 'File';
  _bytes: number;
  _digest: {
    _algorithm: string;
    _value: string;
  };
  _filename: string;
  _mediaType: string;
  _self: string;
  _constrainedBy: string;
  _project: string;
  _rev: 1;
  _deprecated: false;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
}
