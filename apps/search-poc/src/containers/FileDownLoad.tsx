import * as React from 'react';
import { useNexusContext } from '@bbp/react-nexus';
import { Button, Switch } from 'antd';
import './FileDownLoad.css';

const FileDownloadContainer: React.FunctionComponent<{
  fileIds: string[];
  isDownload: boolean;
  downloadFileName?: string;
  OnShowFiles: () => void;
}> = props => {
  const [downloadUrl, setDownloadUrl] = React.useState<any>(null);
  const [isLoading, setLoading] = React.useState<number>(0);
  const nexus = useNexusContext();
  const icons = ['download', 'loading', 'check'];
  const refContainer = React.useRef<any>(null);
  const linkStyle: any = {
    display: 'none',
  };
  const filePanel = () => {
    if (props.isDownload && props.fileIds.length > 0) {
      const fileName = props.downloadFileName
        ? `${props.downloadFileName}.tar.gz`
        : 'nexus-download.tar.gz';
      return (
        <div className="download">
          <a
            href={downloadUrl}
            style={linkStyle}
            ref={refContainer}
            download={fileName}
          >
            download
          </a>
          <Button
            size="small"
            onClick={() => {
              setLoading(1);
            }}
            icon={icons[isLoading]}
            loading={isLoading === 1}
            onBlur={() => {
              setLoading(0);
            }}
          >
            Download {props.fileIds.length} file(s)
          </Button>
        </div>
      );
    }
  };

  React.useEffect(() => {
    if (props.fileIds.length > 0 && isLoading === 1) {
      const resources = props.fileIds.map((fileId: string) => {
        return {
          resourceId: fileId,
          '@type': 'File',
        };
      });
      const [, , , , , org, proj] = props.fileIds[0].split('/');

      nexus.Archive.create(org, proj, { resources }).then((archive: any) => {
        if (archive) {
          const blob = new Blob([archive]);
          const url = window.URL.createObjectURL(blob);
          setDownloadUrl(url);
          setLoading(2);
          refContainer.current.click();
        }
      });
    }
  }, [props, nexus.Archive, isLoading]);

  return (
    <div className="file-download">
      <div className="toggle">
        <Switch
          size="small"
          onChange={() => {
            props.OnShowFiles();
          }}
          checked={props.isDownload}
        />
        <label>Files</label>
      </div>
      {filePanel()}
    </div>
  );
};

export default FileDownloadContainer;
