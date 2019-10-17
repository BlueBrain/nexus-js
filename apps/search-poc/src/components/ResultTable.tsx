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
  handleFileSelect?: (fileIds:string[]) => void;
  selectedFileIds?: string[]
  handleClick: (params: HandleClickParams) => void;
};

const ResultsTable: React.FunctionComponent<ResultTableProps> = ({
  headerProperties,
  items,
  pageSize = PAGE_SIZE,
  handleClick,
  handleFileSelect,
  selectedFileIds
}) => {
  const [searchValue, setSearchValue] = React.useState();
  const [selectAll, setSelectAll] = React.useState<boolean>(false);
  const handelSelectAll = () => {
    const selectedFiles = !selectAll ?  items.map((item) => { console.log(item); return item.fileId}): [];
    setSelectAll(!selectAll);
    console.log(selectedFiles);
    handleFileSelect &&
    handleFileSelect(selectedFiles);
  };
  const selectHandler = (fileId: string) => {
    if(handleFileSelect) {
      const hasFileId = selectedFileIds && selectedFileIds.includes(fileId);

      return <input checked={hasFileId} type='checkbox' onClick={(e) => {
        if(selectedFileIds) {
          const fileIds = hasFileId ?   selectedFileIds.filter((id) => (id !== fileId)) : [...selectedFileIds, fileId];
          handleFileSelect(fileIds);
          e.stopPropagation();
        }
      }} />;
    }
    return null;
  };

  const columnList = [
    ...(headerProperties
      ? headerProperties.map(({ title, dataIndex }) => {
          // We can create special renderers for the cells here
          let render;
          let titleRender:any = title;
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
            case 'File Id': 
              titleRender = () => ( <> <label> Select All </label> <input checked={selectAll} type='checkbox' onChange={(e) => { handelSelectAll()} } /> </>)
              render = (value: string) => selectHandler(value) ;
              break;
            default:
              render = (value: string) => <span>{value}</span>;
              break;
          }

          return {
            dataIndex,
            render,
            title : titleRender,
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
