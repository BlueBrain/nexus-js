/**
 * A set of useful links
 */
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Link, Operation } from './types';

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

export const parseResponse: Link = (operation: Operation, forward?: Link) => {
  // if (response.status >= 400) {
  //   observer.error(await response.json());
  // } else {
  //   const { parseAs } = context;
  //   switch (parseAs) {
  //     case FetchAs.TEXT:
  //       observer.next(await response.text());
  //     case FetchAs.BLOB:
  //       observer.next(await response.blob());
  //     case FetchAs.DOCUMENT:
  //       observer.next(await response.formData());
  //     case FetchAs.JSON:
  //     default:
  //       observer.next(await response.json());
  //   }
  // }
  console.log('parseRESP', { operation });
  const obs = new Observable();
  return obs;
};

export const triggerFetch = (fetch?: any): Link => (
  operation: Operation,
  forward?: Link,
) => {
  return new Observable(observer => {
    const controller = new AbortController();
    const signal = controller.signal;
    const { path, body, headers, method, context = {} } = operation;
    const defaultHeaders = context.noDefaultHeader
      ? {}
      : {
          'Content-Type': 'application/json',
        };

    fetch(path, {
      body,
      headers: { ...defaultHeaders, ...headers },
      signal,
      method,
    })
      .then(async (response: Response) => {
        observer.next(response);
        const nextOperation = {
          ...operation,
          response,
        };
        forward(nextOperation).subscribe(observer);
      })
      .catch(error => {
        observer.error(error);
      })
      .finally(() => {
        observer.complete();
      });

    // On un-subscription, cancel the request
    return () => controller.abort();
  });
};

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
      forward(operation)
        .pipe(
          catchError(error => {
            observer.error(error);
            return of([]);
          }),
        )
        .subscribe(s => observer.next(s));
    }, pollEvery);
    // On un-subscription, stop polling
    return () => clearInterval(interval);
  });
};
