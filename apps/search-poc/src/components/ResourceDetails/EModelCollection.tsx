
import React from 'react';
import { Table } from 'antd';


const emodelTableColumns = [{
  title: 'Name',
  render: (text, emodel) =>
    <a
      key={emodel.id}
      href={`/resources?self=${emodel.self}`}
    >
      {emodel.name}
    </a>,
  key: 'name',
}, {
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
}];

const EModelCollectionDetails: React.FunctionComponent<{
  resource: {
    emodels: {
      id: string;
      self: string;
      name: string;
      description: string;
    }[]
  };
}> = props => {
  return (
    <div className="emodel-collection-details">
      <Table
        rowKey="id"
        className="small-table"
        columns={emodelTableColumns}
        dataSource={props.resource.emodels}
        title={() => 'EModels'}
        size="middle"
        bordered
        pagination={false}
      />
    </div>
  );
};


export default EModelCollectionDetails;
