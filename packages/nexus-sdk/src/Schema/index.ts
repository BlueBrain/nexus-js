import { Observable } from '@bbp/nexus-link';
import { Fetchers, Resource } from '../types';
import {
  GetSchemaOptions,
  ListSchemaOptions,
  SchemaList,
  SchemaPayload,
} from './types';
import { NexusContext } from '../nexusSdk';
import { buildQueryParams } from '../utils';

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
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${
          context.uri
        }/schemas/${orgLabel}/${projectLabel}/${schemaId}${opts}`,
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
        path: `${
          context.uri
        }/schemas/${orgLabel}/${projectLabel}/${schemaId}?rev=${rev}`,
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
        path: `${
          context.uri
        }/schemas/${orgLabel}/${projectLabel}/${schemaId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      schemaId: string,
      rev: number,
    ): Promise<Resource> =>
      httpDelete({
        path: `${
          context.uri
        }/schemas/${orgLabel}/${projectLabel}/${schemaId}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      schemaId: string,
      options?: { pollTime: number },
    ): Observable<Resource> =>
      poll({
        path: `${context.uri}/schemas/${orgLabel}/${projectLabel}/${schemaId}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Schema;
