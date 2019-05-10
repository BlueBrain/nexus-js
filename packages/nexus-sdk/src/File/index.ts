import { toPromise } from '@bbp/nexus-link';

const NexusFile = ({ httpGet }, context: any) => {
  return {
    get: (
      orgLabel: string,
      projectLabel: string,
      fileId: string,
    ): Promise<Blob> =>
      toPromise(
        httpGet({
          path: `${context.uri}/${
            context.version
          }/files/${orgLabel}/${projectLabel}/${fileId}`,
          context: {
            as: 'blob',
          },
        }),
      ),
  };
};

export default NexusFile;
