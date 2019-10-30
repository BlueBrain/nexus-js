/**
 * A set of useful links
 */
import { Observable } from 'rxjs';
import { Link, Operation, FetchAs } from './types';

export const setMethod = (method: string): Link => (
  operation: Operation,
  forward?: Link,
) => {
  if (!forward) {
    throw new Error('No link to forward Operation to.');
  }
  const nextOperation = {
    ...operation,
    method,
  };
  return forward(nextOperation);
};

export const setToken = (token: string): Link => (
  operation: Operation,
  forward?: Link,
) => {
  if (!forward) {
    throw new Error('No link to forward Operation to.');
  }
  const nextOperation = {
    ...operation,
    headers: {
      ...operation.headers,
      Authorization: `bearer ${token}`,
    },
  };
  return forward(nextOperation);
};

export const triggerFetch = (fetch?: any): Link => (operation: Operation) =>
  new Observable(observer => {
    const controller = new AbortController();
    const signal = controller.signal;
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };
    const { path, body, headers, method, context = {} } = operation;
    fetch(path, {
      body,
      headers: { ...defaultHeaders, ...headers },
      signal,
      method,
    })
      .then(async (response: Response) => {
        if (response.status >= 400) {
          observer.error(await response.json());
        } else {
          const { parseAs } = context;
          switch (parseAs) {
            case FetchAs.TEXT:
              observer.next(await response.text());
            case FetchAs.BLOB:
              observer.next(await response.blob());
            case FetchAs.DOCUMENT:
              observer.next(await response.formData());
            case FetchAs.JSON:
            default:
              observer.next(await response.json());
          }
        }
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });

    // On un-subscription, cancel the request
    return () => controller.abort();
  });

export const poll = (pollIntervalMs: number): Link => (
  operation: Operation,
  forward?: Link,
) => {
  if (!forward) {
    throw new Error('No link to forward Operation to.');
  }
  const pollEvery =
    (operation.context && operation.context.pollIntervalMs) || pollIntervalMs;
  return new Observable(observer => {
    const interval = setInterval(() => {
      forward(operation).subscribe(s => observer.next(s));
    }, pollEvery);
    // On un-subscription, stop polling
    return () => clearInterval(interval);
  });
};
