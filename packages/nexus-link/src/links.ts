/**
 * A set of useful links
 * TODO: maybe move each individual links in there own package
 */

import { Observable } from 'zen-observable-ts';
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

export const triggerFetch: Link = (operation: Operation) =>
  new Observable(observer => {
    const controller = new AbortController();
    const signal = controller.signal;
    const { path, body, headers } = operation;
    fetch(path, { body, headers, signal })
      .then(async (response: Response) => {
        if (response.status >= 400) {
          observer.error(await response.json());
        } else {
          const parseAs = operation.context && operation.context.as;
          switch (parseAs) {
            case 'text':
              observer.next(await response.text());
            case 'blob':
              observer.next(await response.blob());
            case 'document':
              observer.next(await response.formData());
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

export const poll = (pollTime: number): Link => (
  operation: Operation,
  forward?: Link,
) => {
  if (!forward) {
    throw new Error('No link to forward Operation to.');
  }
  const pollEvery =
    (operation.context && operation.context.pollTime) || pollTime;
  return new Observable(observer => {
    const interval = setInterval(() => {
      forward(operation).subscribe(s => observer.next(s));
    }, pollEvery);
    // On un-subscription, stop polling
    return () => clearInterval(interval);
  });
};
