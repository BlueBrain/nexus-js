import { Observable } from '@bbp/nexus-link';
import { Fetchers, Resource } from '../types';
import {
  GetSchemaOptions,
  ListSchemaOptions,
  SchemaList,
  SchemaPayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildHeader, buildQueryParams } from '../utils';

const Schema = (
  { httpGet, httpPost, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      schemaId: string,
      options?: GetSchemaOptions,
    ): Promise<Resource> => {
      const { as = 'json', ...opts } = options || {};

      let parseAs = 'json';

      if (as === 'n-triples' || as === 'vnd.graph-viz') {
        parseAs = 'text';
      }

      return httpGet({
        headers: { Accept: buildHeader(as) },
        path: `${
          context.uri
        }/schemas/${orgLabel}/${projectLabel}/${schemaId}${buildQueryParams(
          opts,
        )}`,
        context: {
          parseAs,
        },
      });
    },
    list: (
      orgLabel: string,
      projectLabel: string,
      options?: ListSchemaOptions,
    ): Promise<SchemaList> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/schemas/${orgLabel}/${projectLabel}${opts}`,
      });
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: SchemaPayload,
    ): Promise<Resource> =>
      httpPost({
        path: `${context.uri}/schemas/${orgLabel}/${projectLabel}`,
        body: JSON.stringify(payload),
      }),
    update: (
      orgLabel: string,
      projectLabel: string,
      schemaId: string,
      rev: number,
      payload: SchemaPayload,
    ): Promise<Resource> =>
      httpPut({
        path: `${context.uri}/schemas/${orgLabel}/${projectLabel}/${schemaId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    tag: (
      orgLabel: string,
      projectLabel: string,
      schemaId: string,
      rev: number,
      payload: {
        tag: string;
        rev: number;
      },
    ): Promise<Resource> =>
      httpPost({
        path: `${context.uri}/schemas/${orgLabel}/${projectLabel}/${schemaId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      schemaId: string,
      rev: number,
    ): Promise<Resource> =>
      httpDelete({
        path: `${context.uri}/schemas/${orgLabel}/${projectLabel}/${schemaId}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      schemaId: string,
      options?: GetSchemaOptions & { pollIntervalMs: number },
    ): Observable<Resource> => {
      const { pollIntervalMs, ...getSchemaOptions } = options;
      return poll({
        path: `${
          context.uri
        }/schemas/${orgLabel}/${projectLabel}/${schemaId}${buildQueryParams(
          getSchemaOptions,
        )}`,
        context: { pollIntervalMs: options && options.pollIntervalMs | 1000 },
      });
    },
  };
};

export default Schema;
