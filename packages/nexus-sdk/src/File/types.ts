import { Context } from '../types';

export type NexusFile = {
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
  _rev: number;
  _deprecated: boolean;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
};
