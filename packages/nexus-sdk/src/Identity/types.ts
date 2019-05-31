import { Context } from '../types';

export type IdentityType = 'User' | 'Group' | 'Authenticated' | 'Anonymous';

export type Identity = {
  '@id': string;
  '@type': IdentityType;
  subject?: string;
  realm?: string;
  group?: string;
};

export type IdentityList = {
  '@context': Context;
  identities: Identity[];
};
