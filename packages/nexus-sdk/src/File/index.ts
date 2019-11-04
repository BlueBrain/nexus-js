import { Observable } from '@bbp/nexus-link';
import {
  GetFileOptions,
  NexusFile,
  FilePayload,
  LinkFilePayload,
  UpdateFilePayload,
  CreateFileOptions,
} from './types';
import { buildHeader, buildQueryParams, parseAsBuilder } from '../utils';
import {
  PaginatedList,
  ResourceListOptions,
  TagResourcePayload,
  GetResourceOptions,
} from '../Resource/types';
import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';

const NexusFile = (
  { httpGet, httpPost, httpPut, httpDelete, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      options?: GetFileOptions,
    ): Promise<NexusFile | Blob | string | FormData> => {
      const { as = 'json', ...opts } = options || {};
      const parseAs = parseAsBuilder(as);
      const headers =
        as === 'json' || as === 'vnd.graph-viz' || as === 'n-triples'
          ? { Accept: buildHeader(as) }
          : {};

      return httpGet({
        headers,
        path: `${
          context.uri
        }/files/${orgLabel}/${projectLabel}/${fileId}${buildQueryParams(opts)}`,
        context: {
          parseAs,
        },
      });
    },

    list: (
      orgLabel: string,
      projectLabel: string,
      options?: ResourceListOptions,
    ): Promise<PaginatedList<NexusFile>> => {
      const opts = buildQueryParams(options);
      return httpGet({
        path: `${context.uri}/files/${orgLabel}/${projectLabel}${opts}`,
      });
    },

    create: (
      orgLabel: string,
      projectLabel: string,
      payload: FilePayload,
      options?: CreateFileOptions,
    ): Promise<NexusFile> => {
      const { '@id': fileId, file: body, storage } = payload;
      const opts = buildQueryParams({ storage });
      const headers = (options && options.extraHeaders) || {};

      return fileId
        ? httpPut({
            headers,
            body,
            path: `${context.uri}/files/${orgLabel}/${projectLabel}/${fileId}${opts}`,
            context: {
              noDefaultHeader: true,
            },
          })
        : httpPost({
            headers,
            body,
            path: `${context.uri}/files/${orgLabel}/${projectLabel}${opts}`,
            context: {
              noDefaultHeader: true,
            },
          });
    },

    link: (
      orgLabel: string,
      projectLabel: string,
      payload: LinkFilePayload,
    ): Promise<NexusFile> => {
      const { '@id': fileId, storage, ...body } = payload;
      const opts = buildQueryParams({ storage });
      return fileId
        ? httpPut({
            body: JSON.stringify(body),
            path: `${context.uri}/files/${orgLabel}/${projectLabel}/${fileId}${opts}`,
          })
        : httpPost({
            body: JSON.stringify(body),
            path: `${context.uri}/files/${orgLabel}/${projectLabel}${opts}`,
          });
    },

    update: (
      orgLabel: string,
      projectLabel: string,
      payload: UpdateFilePayload,
      options?: CreateFileOptions,
    ): Promise<NexusFile> => {
      const { '@id': fileId, file: body, storage, rev } = payload;
      const opts = buildQueryParams({ rev, storage });
      const headers = (options && options.extraHeaders) || {};
      return httpPut({
        headers,
        body,
        path: `${context.uri}/files/${orgLabel}/${projectLabel}/${fileId}${opts}`,
      });
    },
    deprecate: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      rev: number,
    ): Promise<NexusFile> =>
      httpDelete({
        path: `${context.uri}/files/${orgLabel}/${projectLabel}/${fileId}?rev=${rev}`,
      }),
    tag: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      payload: TagResourcePayload,
    ): Promise<NexusFile> => {
      const { previousRev, ...body } = payload;
      return httpPost({
        body: JSON.stringify(body),
        path: `${context.uri}/files/${orgLabel}/${projectLabel}/${fileId}/tags?rev=${previousRev}`,
      });
    },
    poll: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
      options?: GetResourceOptions & { pollIntervalMs: number },
    ): Observable<NexusFile> => {
      const { pollIntervalMs, ...getResourceOptions } = options;
      return poll({
        path: `${
          context.uri
        }/files/${orgLabel}/${projectLabel}/${fileId}${buildQueryParams(
          getResourceOptions,
        )}`,
        context: { pollIntervalMs: pollIntervalMs || 1000 },
      });
    },
  };
};

export default NexusFile;
