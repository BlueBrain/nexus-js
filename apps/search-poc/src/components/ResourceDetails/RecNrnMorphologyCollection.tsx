
import React from 'react';
import { Table } from 'antd';


const morphTableColumns = [{
  title: 'Name',
  render: (text, morph) =>
    <a
      key={morph.id}
      href={`/resources?self=${morph.self}`}
    >
      {morph.name}
    </a>,
  key: 'name',
}, {
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
}];

const RecNrnMorphologyCollection: React.FunctionComponent<{
  resource: {
    reconstructedcells: {
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
        title={() => 'Reconstructed neuron morphologies'}
        className="small-table"
        columns={morphTableColumns}
        dataSource={props.resource.reconstructedcells}
        size="middle"
        bordered
      />
    </div>
  );
};


export default RecNrnMorphologyCollection;
