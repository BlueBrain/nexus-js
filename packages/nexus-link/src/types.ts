import { Observable } from 'rxjs';

export type Operation = RequestInit & {
  path: string | RequestInfo;
  context?: Context;
};

export type Context = {
  [keys: string]: any;
  parseAs?: 'blob' | 'text' | 'document' | 'json';
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
