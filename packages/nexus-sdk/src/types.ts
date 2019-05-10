import { StatefulLink, Link, Context } from '@bbp/nexus-link';

export type NexusClientOptions = {
  uri: string;
  version: string;
  links?: (StatefulLink | Link)[];
  context?: Context;
};

export type Fetchers = {
  httpGet: Link;
  httpPost: Link;
  httpPut: Link;
  httpPatch: Link;
  httpDelete: Link;
  poll: Link;
};

export type Context = string | string[];
