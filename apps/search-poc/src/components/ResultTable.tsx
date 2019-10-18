import * as React from 'react';
import { Table } from 'antd';
import './ResultTable.css';
import moment from 'moment';
import { parseProjectUrl } from '../utils';
import { PAGE_SIZE } from '../config';
import Search from 'antd/lib/input/Search';
import { HandleClickParams } from '../types';

type ResultTableProps = {
  headerProperties?: {
    title: string;
    dataIndex: string;
  }[];
  items: {
    id: string;
    [dataIndex: string]: any;
  }[];
  pageSize?: number;
  handleClick: (params: HandleClickParams) => void;
};

const ResultsTable: React.FunctionComponent<ResultTableProps> = ({
  headerProperties,
  items,
  pageSize = PAGE_SIZE,
  handleClick,
}) => {
  const [searchValue, setSearchValue] = React.useState();

  const columnList = [
    ...(headerProperties
      ? headerProperties.map(({ title, dataIndex }) => {
          // We can create special renderers for the cells here
          let render;
          switch (title) {
            case 'Created At':
              render = (date: string) => <span>{moment(date).fromNow()}</span>;
              break;
            case 'Started At Time':
              render = (date: string) => <span>{moment(date).format('L HH:mm')}</span>;
              break;
            case 'Ended At Time':
              render = (date: string) => <span>{date ? moment(date).format('L HH:mm') : ''}</span>;
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

  const filteredItems = items.filter(item => {
    return (
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .search((searchValue || '').toLowerCase()) >= 0
    );
  });

  const tableItems = searchValue ? filteredItems : items;
  const total = tableItems.length;
  const showPagination = total > pageSize;
  return (
    <div className="result-table">
      <Table
        onRow={(data) => ({
          onClick: event => handleClick({ ...data, type: 'resource' }),
        })}
        columns={columnList}
        dataSource={tableItems}
        bordered
        pagination={
          showPagination && {
            total,
            pageSize,
          }
        }
        title={() => (
          <div className="header">
            {(showPagination || !!searchValue) && (
              <Search
                className="search"
                value={searchValue}
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setSearchValue(e.currentTarget.value);
                }}
              />
            )}
            <div className="total">
              {total} {`Result${total > 1 ? 's' : ''}`}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default ResultsTable;
