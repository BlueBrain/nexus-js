import {
  pipe,
  triggerFetch,
  setMethod,
  setToken,
  poll,
  Context,
  toPromise,
  StatefulLink,
  Link,
} from '@bbp/nexus-link';
import { Fetchers } from './types';
import Organization from './Organization';
// tslint:disable-next-line: import-name
import NexusFile from './File';
import Project from './Project';
import View from './View';
import Resolver from './Resolver';
import Storage from './Storage';
import Schema from './Schema';
import Identity from './Identity';
import Realm from './Realm';
import Permissions from './Permissions';
import ACL from './ACL';
import Resource from './Resource';
import { getFetchInstance, getAbortControllerInstance } from './utils';

export type NexusClientOptions = {
  uri: string;
  links?: (StatefulLink | Link)[];
  context?: Context;
  fetch?: any; // fetch api implementation
  token?: string; // bearer token
};

export type NexusContext = Context & {
  uri: string;
};

export function createNexusClient(options: NexusClientOptions) {
  // get fetch instance
  const fetchInstance = options.fetch || getFetchInstance();
  if (!fetchInstance) {
    throw new Error(
      'No `fetch` instance was found. It could be because your browser requires a polyfill or maybe you are trying to run this in Node.js in which case you should use node-fetch or equivalent. You can find more information here: https://github.com/BlueBrain/nexus-js/tree/master/packages/nexus-sdk#nodejs-support',
    );
  }
  // check abort controller presence
  if (!getAbortControllerInstance()) {
    throw new Error(
      'No `AbortController` instance was found. It could be because your browser requires a polyfill or maybe you are trying to run this in Node.js in which case you should use abort-controller or equivalent. You can find more information here: https://github.com/BlueBrain/nexus-js/tree/master/packages/nexus-sdk#nodejs-support',
    );
  }

  const defaultLinks = [triggerFetch(fetchInstance)];
  options.token && defaultLinks.unshift(setToken(options.token));
  const links = options.links
    ? [...options.links, ...defaultLinks]
    : defaultLinks;
  const requestHandler = pipe(links);
  const defaultContext = { uri: options.uri };
  const context: NexusContext = options.context
    ? { ...options.context, ...defaultContext }
    : defaultContext;

  const fetchers: Fetchers = {
    httpGet: operation => toPromise(requestHandler(operation)),
    httpPost: operation =>
      toPromise(pipe([setMethod('POST'), requestHandler])(operation)),
    httpPut: operation =>
      toPromise(pipe([setMethod('PUT'), requestHandler])(operation)),
    httpPatch: operation =>
      toPromise(pipe([setMethod('PATCH'), requestHandler])(operation)),
    httpDelete: operation =>
      toPromise(pipe([setMethod('DELETE'), requestHandler])(operation)),
    poll: pipe([poll(1000), requestHandler]),
  };

  return {
    context,
    Organization: Organization(fetchers, context),
    Project: Project(fetchers, context),
    Resource: Resource(fetchers, context),
    View: View(fetchers, context),
    Resolver: Resolver(fetchers, context),
    Schema: Schema(fetchers, context),
    File: NexusFile(fetchers, context),
    Storage: Storage(fetchers, context),
    Identity: Identity(fetchers, context),
    Realm: Realm(fetchers, context),
    Permissions: Permissions(fetchers, context),
    ACL: ACL(fetchers, context),
    ...fetchers,
  };
}
