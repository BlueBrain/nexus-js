import * as React from 'react';
import { Table } from 'antd';

const ResultsTable: React.FunctionComponent<{
  headerProperties?: {
    title: string;
    dataIndex: string;
  }[];
  items: {
    id: string;
    [dataIndex: string]: any;
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
    ...(headerProperties &&
      headerProperties.map(({ title, dataIndex }) => ({
        title,
        dataIndex,
        className: `result-${dataIndex}`,
        render: value => <span>{value}</span>,
      }))),
  ];

  return (
    <div className="ResultTable">
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
