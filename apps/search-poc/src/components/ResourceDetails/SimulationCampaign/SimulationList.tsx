
import React from 'react';
import moment from 'moment';
import { Table, Badge } from 'antd';

import { SimulationCampaignSimulation } from '../../../containers/ResourceDetails/types';
import { HandleClickParams } from '../../../types';

import './SimulaitonCampaign.css';

interface BadgeStatus {
  [simStatus: string]: 'default' | 'processing' | 'error' | 'success' | 'warning',
}

const badgeStatus: BadgeStatus = {
  'Pending': 'default',
  'Running': 'processing',
  'Failed': 'error',
  'Done': 'success',
};

const simulationsTableColumns = [
  {
    title: 'Simulations',
    dataIndex: 'name',
    key: 'name',
    render: (name: string) => name.length > 70 ? `...${name.slice(-67)}` : name,
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
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => <Badge status={badgeStatus[status]} text={status}/>
  },
];

const SimulationList: React.FunctionComponent<{
  simulations: SimulationCampaignSimulation[];
  handleClick: (params: HandleClickParams) => void;
}> = props =>
  <div className="mt">
    <Table
      className="small-table campaign-simulations-table"
      dataSource={props.simulations}
      columns={simulationsTableColumns}
      rowKey={row => row.self}
      pagination={false}
      size="middle"
      bordered
      onRow={(data) => ({
        onClick: () => props.handleClick({ ...data, type: 'resource' }),
      })}
    />
  </div>

export default SimulationList;
