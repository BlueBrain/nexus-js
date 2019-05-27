import { pipe, triggerFetch, setMethod, poll, Context } from '@bbp/nexus-link';
import { NexusClientOptions, Fetchers } from './types';
import Organization from './Organization';
import NexusFile from './File';
import Project from './Project';
import {
  View,
  SparqlView,
  ElasticSearchView,
  AggregatedElasticSearchView,
  AggregatedSparqlView,
} from './View';
import Resolver from './Resolver';
import Storage from './Storage';

export type NexusContext = Context & {
  uri: string;
  version: string;
};
export function createNexusClient(options: NexusClientOptions) {
  const links = options.links
    ? [...options.links, triggerFetch]
    : [triggerFetch];
  const requestHandler = pipe(links);
  const defaultContext = { uri: options.uri, version: options.version };
  const context: NexusContext = options.context
    ? { ...options.context, ...defaultContext }
    : defaultContext;

  const fetchers: Fetchers = {
    httpGet: requestHandler,
    httpPost: pipe([setMethod('POST'), requestHandler]),
    httpPut: pipe([setMethod('PUT'), requestHandler]),
    httpPatch: pipe([setMethod('PATH'), requestHandler]),
    httpDelete: pipe([setMethod('DELETE'), requestHandler]),
    poll: pipe([poll(1000), requestHandler]),
  };

  return {
    Organization: Organization(fetchers, context),
    Project: Project(fetchers, context),
    View: View(fetchers, context),
    SparqlView: SparqlView(fetchers, context),
    ElasticSearchView: ElasticSearchView(fetchers, context),
    AggregatedElasticSearchView: AggregatedElasticSearchView(fetchers, context),
    AggregatedSparqlView: AggregatedSparqlView(fetchers, context),
    Resolver: Resolver(fetchers, context),
    File: NexusFile(fetchers, context),
    Storage: Storage(fetchers, context),
  };
}
