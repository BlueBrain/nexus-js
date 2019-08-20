import React from 'react';
import { Table } from 'antd';

export type Morph = {
  id: string;
  self: string;
  name: string;
  description: string;
};

const morphTableColumns = [
  {
    title: 'Name',
    render: (_: any, morph: Morph) => (
      <a key={morph.id} href={`/resources?self=${morph.self}`}>
        {morph.name}
      </a>
    ),
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

const RecNrnMorphologyCollection: React.FunctionComponent<{
  resource: {
    reconstructedcells: Morph[];
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
