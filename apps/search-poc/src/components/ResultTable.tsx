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
  onRowClick?: (rowData: any, index: number) => void;
}> = ({ headerProperties, items, total, onRowClick = () => {} }) => {
  const columnList = [
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
        onRow={(data, index) => ({
          onClick: event => onRowClick(data, index),
        })}
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
