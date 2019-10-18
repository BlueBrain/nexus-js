
import React from 'react';
import moment from 'moment';
import { Badge, Table } from 'antd';

import { SimulationCampaignResource } from '../../../containers/ResourceDetails/types';
import { HandleClickParams } from '../../../types';

import './SimulaitonCampaign.css';


interface BadgeStatus {
  [simStatus: string]: 'default' | 'processing' | 'error' | 'success' | 'warning',
}

const simulationsTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => name.length > 80 ? `...${name.slice(-77)}` : name,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => <Badge status={badgeStatus[status]} text={status}/>
  },
  {
    title: 'Started at',
    dataIndex: 'startedAtTime',
    key: 'startedAtTime',
    render: (timeStr: string) => moment(timeStr).format('L HH:mm'),
  },
  {
    title: 'Ended at',
    dataIndex: 'endedAtTime',
    key: 'endedAtTime',
    render: (timeStr: string | null) => timeStr ? moment(timeStr).format('L HH:mm') : '-',
  }
];

const badgeStatus: BadgeStatus = {
  'Pending': 'default',
  'Running': 'processing',
  'Failed': 'error',
  'Done': 'success',
};

const SimulationCampaign: React.FunctionComponent<{
  resource: SimulationCampaignResource;
  handleClick: (params: HandleClickParams) => void;
}> = props => {

  const { resource } = props;

  const staretAtTime = moment(resource.startedAtTime).format('L HH:mm');

  return (
    <div className="simulation-campaign-details">
      <p>
        Status: &nbsp;
        <Badge
          status={badgeStatus[resource.status]}
          text={resource.status}
        />
      </p>
      <p>Started at: {staretAtTime}</p>
      <p>Ended at:
        {
          resource.endedAtTime
            ? moment(resource.endedAtTime).format('L HH:mm')
            : '-'
        }
      </p>

      <Table
        className="small-table campaign-simulations-table"
        dataSource={resource.simulations}
        columns={simulationsTableColumns}
        pagination={false}
        size="middle"
        bordered
        title={() => 'Simulations'}
        onRow={(data) => ({
          onClick: () => props.handleClick({ ...data, type: 'resource' }),
        })}
      />
    </div>
  );
};

export default SimulationCampaign;
