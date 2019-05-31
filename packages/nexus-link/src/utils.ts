import { Link, Operation } from './types';
import { StatefulLink } from './nexusLink';
import zenObservableTs from 'zen-observable-ts';

/**
 * Transforms a Link into a StatefulLink
 *
 * @param handler
 */
export function toLink(handler: Link | StatefulLink): StatefulLink {
  return typeof handler === 'function' ? new StatefulLink(handler) : handler;
}

/**
 * Joins 2 Links together
 *
 * @param req1
 * @param req2
 */
export function concat(
  req1: Link | StatefulLink,
  req2: Link | StatefulLink,
): Link {
  return (operation: Operation) =>
    toLink(req1).request(operation, o => toLink(req2).request(o));
}

/**
 * Joins a list of links together
 *
 * @param links
 */
export function pipe(links: (Link | StatefulLink)[]): Link {
  // @ts-ignore
  return links.reverse().reduce((prev, curr) => {
    return concat(curr, prev);
  });
}

export function toPromise(observable: zenObservableTs<any>): Promise<any> {
  return new Promise((resolve, reject) => {
    observable.subscribe({
      next: resolve,
      error: reject,
      complete: resolve,
    });
  });
}
