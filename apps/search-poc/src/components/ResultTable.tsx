import * as React from 'react';
import { Table } from 'antd';
import './ResultTable.css';

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

const ResultsTable: React.FunctionComponent<{
  headerProperties?: {
    title: string;
    dataIndex: string;
  }[];
  items: {
    id: string;
    [key: string]: any;
  }[];
  total: number;
}> = ({ headerProperties, items, total }) => {
  const columnList = [
    {
      title: 'Identifier',
      dataIndex: 'id',
      className: 'result-id',
      render: id => <span>{id}</span>,
    },
    ...(headerProperties ||
      [].map(({ title, dataIndex }) => ({
        title,
        dataIndex,
        className: `result-${dataIndex}`,
        render: value => <span>{value}</span>,
      }))),
  ];

  return (
    <div className="result-table">
      <Table
        columns={columnList}
        dataSource={items}
        bordered
        pagination={false}
        title={() => (
          <h3>
            {total} {`Result${total > 1 ? 's' : ''}`}
          </h3>
        )}
      />
    </div>
  );
};

export default ResultsTable;
