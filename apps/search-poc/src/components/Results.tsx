import * as React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: '@id',
    className: 'result-id',
    render: id => <span>{id}</span>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: name => <span>{name}</span>,
  },
  {
    title: 'brainRegion',
    className: 'brain-region',
    dataIndex: 'brainLocation.brainRegion.label',
  },
];

const Results: React.FunctionComponent<{
  items: any[];
  total: number;
}> = ({ items, total }) => {
  return (
    <div className="Results">
      <Table
        columns={columns}
        dataSource={items}
        bordered
        title={() => <h3>found {total} results</h3>}
      />
    </div>
  );
};

export default Results;
