
import React from 'react';
import sortBy from 'lodash/sortBy';
import { Table, Collapse } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import './EModel.css';

import { Resource } from '@bbp/nexus-sdk';
import { MINDSResource, EModelResource } from '../../containers/ResourceDetails/types';


const { Panel } = Collapse;
const protocolR = /^(.*)\.(\w+)\.(\w+)$/;

const paramColumns = [{
  title: 'Parameter',
  dataIndex: 'param',
  key: 'param',
}, {
  title: 'Value',
  dataIndex: 'val',
  key: 'val',
}] as ColumnProps<any>[];

const fitnessColumns = [{
  title: 'Protocol',
  render: () => <></>,
  key: 'protocol',
}, {
  title: 'Target',
  render: () => <></>,
  key: 'recTarget',
}, {
  title: 'Parameter',
  dataIndex: 'param',
  key: 'param',
}, {
  title: 'Value',
  dataIndex: 'val',
  key: 'val',
}] as ColumnProps<any>[];

function createUniqColumnRenderer(dataSource: object[], dataKey: string, colKey: string) {
  return (value, row, index) => {
    const obj = { children: value[dataKey], props: { rowSpan: 1 } };
    const isRendered = dataSource
      .slice(0, index)
      .some(entry => entry[colKey] === value[colKey]);

    obj.props.rowSpan = isRendered
      ? 0
      : dataSource.filter(entry => entry[colKey] === value[colKey]).length;

    return obj;
  };
};

function createFitnessDSEntry([paramRaw, val]) {
  const [, protocolRaw, recTarget, param ] = paramRaw
    .match(protocolR) as string[];

  const protocol = protocolRaw.replace(/_/g, ' ');
  const key = paramRaw;

  return { key, protocol, recTarget, param, val };
};

const EModelDetails: React.FunctionComponent<{
  resource: Resource & MINDSResource & EModelResource;
}> = props => {
  const { score, seed, fitness, params } = props.resource;

  const fitnessDSUnsorted = Object.entries(fitness)
    .map(createFitnessDSEntry)
    .filter(entry => entry);

  const fitnessDS = sortBy(fitnessDSUnsorted, ['parameter', 'recTarget', 'protocol']);

  fitnessColumns[0].render = createUniqColumnRenderer(fitnessDS, 'protocol', 'protocol');
  fitnessColumns[1].render = createUniqColumnRenderer(fitnessDS, 'recTarget', 'protocol');

  const paramDS = Object.entries(params)
    .map(([key, val]) => ({ key, param: key, val }));

  return (
    <div className="emodel-details">
      <p>Seed: {seed}</p>
      <p>Score: {score}</p>

      <Collapse>
        <Panel header="Fitness" key="fitness">
          <Table
            className="small-table"
            dataSource={fitnessDS}
            columns={fitnessColumns}
            pagination={false}
            size="middle"
            bordered
          />
        </Panel>
        <Panel header="Optimized parameters" key="params">
          <Table
            className="small-table"
            dataSource={paramDS}
            columns={paramColumns}
            pagination={false}
            size="middle"
            bordered
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default EModelDetails;
