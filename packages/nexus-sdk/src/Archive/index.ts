import { Fetchers, Resource } from '../types';
import { NexusContext } from '../nexusSdk';
import { ArchivePayload } from './types';

const Archive = (
  { httpGet, httpPut, httpPost, poll }: Fetchers,
  context: NexusContext,
) => {
  return {
    get: <T>(
      orgLabel: string,
      projectLabel: string,
      archiveId: string,
    ): Promise<Resource & T> =>
      httpGet({
        path: `${context.uri}/archives/${orgLabel}/${projectLabel}/${archiveId}`,
        context: { as: 'text' },
      }),
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
