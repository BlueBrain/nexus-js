import Observable from 'zen-observable-ts';
import { StatefulLink } from './nexusLink';

export type Operation = RequestInit & {
  path: string | RequestInfo;
  context?: Context;
};

export type Context = {
  [keys: string]: any;
};

export type Link = (
  operation: Operation,
  forward?: NextLink,
) => Observable<any>;

export type NextLink = (operation: Operation) => Observable<any>;

export type NexusClientOptions = {
  uri: string;
  version: string;
  links?: (StatefulLink | Link)[];
  context?: Context;
};

export type Fetchers = {
  httpGet: Link;
  httpPost: Link;
  httpPut: Link;
  httpPatch: Link;
  httpDelete: Link;
  poll: Link;
};
