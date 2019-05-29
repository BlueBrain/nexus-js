import { Operation, Observable } from '@bbp/nexus-link';
import { Fetchers } from './types';

export const mockFetchers: Fetchers = {
  httpGet: (operation: Operation) => fetch(operation.path, { ...operation }),
  httpPost: (operation: Operation) => fetch(operation.path, { ...operation }),
  httpPut: (operation: Operation) => fetch(operation.path, { ...operation }),
  httpPatch: (operation: Operation) => fetch(operation.path, { ...operation }),
  httpDelete: (operation: Operation) => fetch(operation.path, { ...operation }),
  poll: (operation: Operation) => new Observable(() => {}),
};
