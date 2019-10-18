
import React from 'react';
import moment from 'moment';
import { Badge, Input, Button, Row, Col } from 'antd';

import { SimulationResource } from '../../../containers/ResourceDetails/types';
import Copy from '../../../components/Copy';
import { HandleClickParams } from '../../../types';


interface BadgeStatus {
  [simStatus: string]: 'default' | 'processing' | 'error' | 'success' | 'warning',
}

const badgeStatus: BadgeStatus = {
  'Pending': 'default',
  'Running': 'processing',
  'Failed': 'error',
  'Done': 'success',
};

const BasicInfo: React.FunctionComponent<{
  resource: SimulationResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {

  const { resource } = props;
  const { status } = resource;

  const startedAtTime = moment(resource.startedAtTime).format('L HH:mm');
  const endedAtTime = resource.endedAtTime
    ? moment(resource.endedAtTime).format('L HH:mm')
    : '-';

  const blueConfigPath = `${resource.path}/BlueConfig`;

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <div className="white-box">
            <strong className="mr">Started:</strong>
            <span className="float-right">{startedAtTime}</span>
          </div>
        </Col>
        <Col span={8}>
          <div className="white-box">
            <strong className="mr">Ended:</strong>
            <span className="float-right">{endedAtTime}</span>
          </div>
        </Col>
        <Col span={8}>
          <div className="white-box">
            <strong className="mr">Status:</strong>
            <span className="float-right">
              <Badge status={badgeStatus[status]} text={status} />
            </span>
          </div>
        </Col>
      </Row>

      <Input
        className="mt"
        readOnly
        addonBefore="BlueConfig path"
        addonAfter={
          <Copy
            textToCopy={blueConfigPath}
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
        defaultValue={blueConfigPath}
      />
    </div>
  );
};

export default BasicInfo;
