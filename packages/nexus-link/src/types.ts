import Observable from 'zen-observable-ts';

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

export enum FetchAs {
  BLOB = 'blob',
  TEXT = 'text',
  DOCUMENT = 'document',
  JSON = 'json',
}
