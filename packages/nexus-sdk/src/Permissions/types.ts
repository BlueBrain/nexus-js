import { Context } from '../types';

export type Permissions = {
  '@context': Context;
  '@id': string;
  '@type': 'Permissions';
  permissions: string[];
  _rev: number;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
};

export type GetPermissionsOptions = {
  rev?: number;
  [key: string]: any;
};

export type PermissionsPayload = {
  permissions: string[];
};
