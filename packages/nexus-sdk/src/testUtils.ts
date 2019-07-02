import { Operation, Observable } from '@bbp/nexus-link';
import { Fetchers } from './types';

export const mockFetchers: Fetchers = {
  httpGet: (operation: Operation) =>
    fetch(operation.path, {
      headers: operation.headers,
      body: operation.body,
      method: 'GET',
    }),
  httpPost: (operation: Operation) =>
    fetch(operation.path, {
      headers: operation.headers,
      body: operation.body,
      method: 'POST',
    }),
  httpPut: (operation: Operation) =>
    fetch(operation.path, {
      headers: operation.headers,
      body: operation.body,
      method: 'PUT',
    }),
  httpPatch: (operation: Operation) =>
    fetch(operation.path, {
      headers: operation.headers,
      body: operation.body,
      method: 'PATCH',
    }),
  httpDelete: (operation: Operation) =>
    fetch(operation.path, {
      headers: operation.headers,
      body: operation.body,
      method: 'DELETE',
    }),
  poll: (operation: Operation) =>
    new Observable(observer => {
      fetch(operation.path, {
        headers: operation.headers,
        body: operation.body,
        method: 'GET',
      }).then(value => {
        observer.next(value);
      });
    }),
};
