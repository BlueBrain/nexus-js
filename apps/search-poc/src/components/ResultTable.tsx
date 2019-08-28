import * as React from 'react';
import { Table } from 'antd';
import './ResultTable.css';
import moment from 'moment';
import { parseProjectUrl } from '../utils';

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
  paginationSettings?: {
    pageSize: number;
  };
  onRowClick?: (rowData: any, index: number) => void;
};

const ResultsTable: React.FunctionComponent<ResultTableProps> = ({
  headerProperties,
  paginationSettings,
  items,
  total,
  onRowClick = () => {},
}) => {
  const columnList = [
    ...(headerProperties
      ? headerProperties.map(({ title, dataIndex }) => {
          // We can create special renderers for the cells here
          let render;
          switch (title) {
            case 'Created At':
              render = (date: string) => <span>{moment(date).fromNow()}</span>;
              break;
            case 'Project':
              render = (projectURI: string) => {
                const [org, project] = parseProjectUrl(projectURI);
                return (
                  <span>
                    <b>{org}</b> / {project}
                  </span>
                );
              };
              break;
            default:
              render = (value: string) => <span>{value}</span>;
              break;
          }

          return {
            title,
            dataIndex,
            render,
            className: `result-column ${dataIndex}`,
          };
        })
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
        pagination={
          !!total &&
          !!paginationSettings && {
            total,
            pageSize: paginationSettings.pageSize,
          }
        }
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
