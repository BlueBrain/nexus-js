import * as React from 'react';
import { Card, Spin, Empty } from 'antd';
import './MorphologyViewer.css';

const MorphologyViewer: React.FunctionComponent<{
  loading: boolean;
  error: Error | null;
  stage?: string;
  morphology: any;
  ref: React.RefObject<HTMLDivElement>;
}> = ({ loading, error, ref, stage }) => {
  return (
    <Spin spinning={loading} tip={stage}>
      <Card hoverable className="morphology-viewer">
        <div className={`viewer ${!loading && !error && '-loaded'}`} ref={ref}>
          {error && <Empty>{error.message}</Empty>}
        </div>
      </Card>
    </Spin>
  );
};

export default MorphologyViewer;
