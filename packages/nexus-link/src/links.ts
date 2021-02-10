/**
 * A set of useful links
 */
import { Observable, of, Subscription } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { FetchAs, Link, Operation } from './types';

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
  return new Observable(observer => {
    const parse = async () => {
      if (operation.response) {
        if (operation.response.status >= 400) {
          observer.error(await operation.response.json());
        } else {
          const { parseAs } = operation.context || { parseAs: 'json' };
          switch (parseAs) {
            case FetchAs.TEXT:
              observer.next(await operation.response.text());
            case FetchAs.BLOB:
              observer.next(await operation.response.blob());
            case FetchAs.DOCUMENT:
              observer.next(await operation.response.formData());
            case FetchAs.JSON:
            default:
              observer.next(await operation.response.json());
          }
        }
      }
    };

    const forwardObserver: Subscription = forward
      ? forward(operation).subscribe(observer)
      : null;

    parse()
      .then()
      .catch(error => observer.error(error))
      .finally(() => observer.complete());

    return () => {
      observer.unsubscribe();
      forwardObserver && forwardObserver.unsubscribe();
    };
  });
};

export const triggerFetch = (fetch?: any): Link => (
  operation: Operation,
  forward?: Link,
) => {
  const fetchObservable = new Observable<Response>(subscriber => {
    const { path, body, headers, method, context = {} } = operation;
    const defaultHeaders = context.noDefaultHeader
      ? {}
      : {
          'Content-Type': 'application/json',
        };
    fetch(path, {
      body,
      headers: { ...defaultHeaders, ...headers },
      method,
    })
      .then(async (response: Response) => {
        subscriber.next(response);
      })
      .catch(error => {
        subscriber.error(error);
      })
      .finally(() => {
        subscriber.complete();
      });
  });

  // add Response to subsequent links if there are any, otherwise return Response directly.
  return forward
    ? fetchObservable.pipe(
        flatMap(response => forward({ ...operation, response })),
      )
    : fetchObservable;
};

export const oldtriggerFetch = (fetch?: any): Link => (operation: Operation) =>
  new Observable(observer => {
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
