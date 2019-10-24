import { Fetchers, Resource } from '../types';
import { NexusContext } from '../nexusSdk';
import { ArchivePayload, GetArchiveOptions } from './types';
import { buildQueryParams } from '../utils';

const Archive = (
  { httpGet, httpPut, httpPost, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: <T>(
      orgLabel: string,
      projectLabel: string,
      archiveId: string,
      options?: GetArchiveOptions,
    ): Promise<Resource & T> => {
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
    ): Promise<Resource> =>
      httpPost({
        path: `${context.uri}/archives/${orgLabel}/${projectLabel}`,
        body: JSON.stringify(payload),
        context: { as: 'text' },
      }),
    createWithId: (
      orgLabel: string,
      projectLabel: string,
      resourceId: string,
      payload: ArchivePayload,
    ): Promise<Resource> =>
      httpPut({
        path: `${context.uri}/archives/${orgLabel}/${projectLabel}/${resourceId}`,
        body: JSON.stringify(payload),
        context: { as: 'text' },
      }),
  };
};

export default Archive;
