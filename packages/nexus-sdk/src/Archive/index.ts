import { Fetchers } from '../types';
import { NexusContext } from '../nexusSdk';
import { ArchivePayload, GetArchiveOptions, Archive } from './types';
import { buildQueryParams } from '../utils';

const Archive = (
  { httpGet, httpPut, httpPost, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      archiveId: string,
      options?: GetArchiveOptions,
    ): Promise<Archive | Blob | string> => {
      const opts = { as: 'text', ...options };
      const acceptHeader =
        opts.as === 'json' ? 'application/ld+json' : 'application/x-tar';
      return httpGet({
        headers: { Accept: acceptHeader },
        path: `${
          context.uri
        }/archives/${orgLabel}/${projectLabel}/${archiveId}${buildQueryParams(
          opts,
        )}`,
      });
    },
    create: (
      orgLabel: string,
      projectLabel: string,
      payload: ArchivePayload,
    ): Promise<Archive | Blob | string> => {
      const id = payload.archiveId;
      return id
        ? httpPut({
            path: `${context.uri}/archives/${orgLabel}/${projectLabel}/${id}`,
            body: JSON.stringify(payload),
            context: { as: 'text' },
          })
        : httpPost({
            path: `${context.uri}/archives/${orgLabel}/${projectLabel}`,
            body: JSON.stringify(payload),
            context: { as: 'text' },
          });
    },
  };
};

export default Archive;
