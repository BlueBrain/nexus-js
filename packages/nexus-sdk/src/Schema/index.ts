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
    ): Promise<Storage> => {
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
    ): Promise<Storage> =>
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
    ): Promise<Storage> =>
      httpPut({
        path: `${
          context.uri
        }/schemas/${orgLabel}/${projectLabel}/${schemaId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    tag: (
      orgLabel: string,
      projectLabel: string,
      storageId: string,
      rev: number,
      payload: {
        tag: string;
        rev: number;
      },
    ): Promise<Resource> =>
      httpPost({
        path: `${
          context.uri
        }/schemas/${orgLabel}/${projectLabel}/${storageId}?rev=${rev}`,
        body: JSON.stringify(payload),
      }),
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      schemaId: string,
      rev: number,
    ): Promise<Storage> =>
      httpDelete({
        path: `${
          context.uri
        }/schemas/${orgLabel}/${projectLabel}/${schemaId}?rev=${rev}`,
      }),
    poll: (
      orgLabel: string,
      projectLabel: string,
      schemasId: string,
      options?: { pollTime: number },
    ): Observable<Storage> =>
      poll({
        path: `${context.uri}/schemas/${orgLabel}/${projectLabel}/${schemasId}`,
        context: { pollTime: options && options.pollTime | 1000 },
      }),
  };
};

export default Schema;
