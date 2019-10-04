import { Link, Context, Operation } from '@bbp/nexus-link';
import { createNexusClient } from './nexusSdk';

export type Fetchers = {
  httpGet: (operation: Operation) => Promise<any>;
  httpPost: (operation: Operation) => Promise<any>;
  httpPut: (operation: Operation) => Promise<any>;
  httpPatch: (operation: Operation) => Promise<any>;
  httpDelete: (operation: Operation) => Promise<any>;
  poll: Link;
};

export type Context =
  | string
  | (string | { [key: string]: string })[]
  | { [key: string]: string };

// TODO: find the real way, I know this is cheating...
// but this essentially generates the "global type" the nexus client is made of
const nexus = createNexusClient({ uri: '' });
export type NexusClient = typeof nexus;
export * from './Resource/types';
export * from './File/types';
export * from './Identity/types';
export * from './Organization/types';
export * from './Project/types';
export * from './Resolver/types';
export * from './Schema/types';
export * from './Storage/types';
export * from './View/types';
export * from './Realm/types';
export * from './Permissions/types';
export * from './ACL/types';
export * from './Archive/types';
