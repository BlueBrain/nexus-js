import * as React from 'react';
import { Table } from 'antd';
import './ResultTable.css';
import moment from 'moment';
import { parseProjectUrl } from '../utils';
import { PAGE_SIZE } from '../config';
import Search from 'antd/lib/input/Search';
import { HandleClickParams } from '../types';
import { TableRowSelection } from 'antd/lib/table';

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
  isDownload?: boolean;
  handleFileSelect?: (fileIds: string[]) => void;
  handleClick: (params: HandleClickParams) => void;
};

const ResultsTable: React.FunctionComponent<ResultTableProps> = ({
  headerProperties,
  items,
  pageSize = PAGE_SIZE,
  handleClick,
  handleFileSelect,
  isDownload,
}) => {
  const [searchValue, setSearchValue] = React.useState();
  const [selectedRows, setSelectedRows] = React.useState<any[] | []>([]);;


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
            dataIndex,
            render,
            title,
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
  const rowSelection: TableRowSelection<any>  = { 
    fixed:true,
    selectedRowKeys: selectedRows,
    onChange:  (selectedRowKeys , selectedRows)  => { 
      setSelectedRows(selectedRowKeys);
      const fileIds = selectedRows.map((o) => {
        return o.fileId;
      })
      handleFileSelect && handleFileSelect(fileIds);
  }};
 const rowSelectionProp = isDownload ? { rowSelection } : {};
 
  
  
  return (
    <div className="result-table">
      <Table
        onRow={data => ({
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
        {...rowSelectionProp}
      />
    </div>
  );
};

export default ResultsTable;
