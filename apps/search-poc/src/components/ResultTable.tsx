import * as React from 'react';
import { Table } from 'antd';
import './ResultTable.css';

type ResultTableProps = {
  headerProperties?: {
    title: string;
    dataIndex: string;
  }[];
  items: {
    id: string;
    [dataIndex: string]: any;
  }[];
  total?: number;
  onRowClick?: (rowData: any, index: number) => void;
};

const ResultsTable: React.FunctionComponent<ResultTableProps> = ({
  headerProperties,
  items,
  total,
  onRowClick = () => {},
}) => {
  const columnList = [
    ...(headerProperties
      ? headerProperties.map(({ title, dataIndex }) => ({
          title,
          dataIndex,
          className: `result-column ${dataIndex}`,
          render: (value: any) => <span>{value}</span>,
        }))
      : []),
  ];

  return (
    <div className="result-table">
      <Table
        onRow={(data, index) => ({
          onClick: event => onRowClick(data, index),
        })}
        columns={columnList}
        dataSource={items}
        bordered
        pagination={false}
        title={
          total
            ? () => (
                <h3>
                  {total} {`Result${total > 1 ? 's' : ''}`}
                </h3>
              )
            : undefined
        }
      />
    </div>
  );
};

export default ResultsTable;
