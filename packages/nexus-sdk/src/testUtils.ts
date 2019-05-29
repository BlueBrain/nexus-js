import { Operation, Observable } from '@bbp/nexus-link';
import { Fetchers } from './types';

export const mockFetchers: Fetchers = {
  httpGet: (operation: Operation) =>
    fetch(operation.path, { headers: operation.headers, body: operation.body }),
  httpPost: (operation: Operation) =>
    fetch(operation.path, { headers: operation.headers, body: operation.body }),
  httpPut: (operation: Operation) =>
    fetch(operation.path, { headers: operation.headers, body: operation.body }),
  httpPatch: (operation: Operation) =>
    fetch(operation.path, { headers: operation.headers, body: operation.body }),
  httpDelete: (operation: Operation) =>
    fetch(operation.path, { headers: operation.headers, body: operation.body }),
  poll: (operation: Operation) => new Observable(() => {}),
};
