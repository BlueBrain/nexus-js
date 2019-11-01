
import React from 'react';
import { Input, Button, Row, Col } from 'antd';

import { SimulationResource } from '../../../containers/ResourceDetails/types';
import Copy from '../../../components/Copy';
import { HandleClickParams } from '../../../types';


const BasicInfo: React.FunctionComponent<{
  resource: SimulationResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {

  const { resource } = props;
  const slurmLogPath = `${resource.path}/slurm-${resource.jobId}.out`;

  return (
    <div className="mt">
      <h3>Slurm info</h3>
      <Row gutter={16}>
        <Col span={8}>
          <Input
            readOnly
            addonBefore="Job ID"
            addonAfter={
              <Copy
                textToCopy={resource.jobId}
                render={(copySuccess, triggerCopy) => (
                  <Button
                    block
                    type="link"
                    size="small"
                    icon="copy"
                    onClick={() => triggerCopy()}
                  >
                    {copySuccess ? 'Copied!' : 'Copy'}
                  </Button>
                )}
              />
            }
            defaultValue={resource.jobId}
          />
        </Col>
        <Col span={16}>
          <Input
            readOnly
            addonBefore="Log"
            addonAfter={
              <Copy
                textToCopy={slurmLogPath}
                render={(copySuccess, triggerCopy) => (
                  <Button
                    block
                    type="link"
                    size="small"
                    icon="copy"
                    onClick={() => triggerCopy()}
                  >
                    {copySuccess ? 'Copied!' : 'Copy'}
                  </Button>
                )}
              />
            }
            defaultValue={slurmLogPath}
          />
        </Col>
      </Row>
    </div>
  );
};

export default BasicInfo;
