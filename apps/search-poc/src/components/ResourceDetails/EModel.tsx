
import React, { ReactNode } from 'react';
import sortBy from 'lodash/sortBy';
import { Table, Collapse } from 'antd';

import { Resource } from '@bbp/nexus-sdk';
import { MINDSResource, EModelResource } from '../../containers/ResourceDetails/types';


const { Panel } = Collapse;
const protocolR = /^(?:_?\.)(.*)\.(\w+)\.(\w+)\.(\w+)$/;

const paramColumns = [{
  title: 'Parameter',
  dataIndex: 'param',
  key: 'param',
}, {
  title: 'Value',
  dataIndex: 'val',
  key: 'val',
}];


/**
 * Parses fitness raw parameter name into:
 * * protocol (formatted by replacing underscores with spaces)
 * * recTarget
 * * recType
 * * param
 *
 * @param rawParamName [string] Fitness raw parameter name
 *
 * @example
 * parseFitnessRawParamName('_.APWaveform_300.soma.v.AHP_depth_abs');
 * {
 *   protocol: 'APWaveform_300',
 *   recTarget: 'soma',
 *   recType: 'v',
 *   param: 'AHP_depth_abs'
 * }
 */
export function parseFitnessRawParamName(rawParamName: string): {
  protocol: string;
  recTarget: string;
  recType: string;
  param: string;
} {
  const [, rawProtocolName, recTarget, recType, param] = rawParamName
    .match(protocolR) as string[];

  const protocol = rawProtocolName.replace(/_/g, ' ');

  return { protocol, recTarget, recType, param };
}

function createUniqColumnRenderer(
  dataSource: object[],
  dataKey: string,
  colKey: string
): (value: any, row: any, index: number) => ReactNode | undefined {
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

function createFitnessDataSourceEntry([paramRaw, val]) {
  const {
    protocol,
    recTarget,
    recType,
    param
  } = parseFitnessRawParamName(paramRaw);

  const key = paramRaw;

  return { key, protocol, recTarget, recType, param, val };
};

const EModelDetails: React.FunctionComponent<{
  resource: Resource & MINDSResource & EModelResource;
}> = props => {
  const { score, seed, fitness, params } = props.resource;

  const fitnessDSUnsorted = Object.entries(fitness)
    .map(createFitnessDataSourceEntry);

  const fitnessDataSource = sortBy(fitnessDSUnsorted, ['parameter', 'recTarget', 'protocol']);

  const fitnessColumns = [{
    title: 'Protocol',
    render: createUniqColumnRenderer(fitnessDataSource, 'protocol', 'protocol'),
    key: 'protocol',
  }, {
    title: 'Target',
    render: createUniqColumnRenderer(fitnessDataSource, 'recTarget', 'protocol'),
    key: 'recTarget',
  }, {
    title: 'Type',
    render: createUniqColumnRenderer(fitnessDataSource, 'recType', 'protocol'),
    key: 'recType'
  }, {
    title: 'Parameter',
    dataIndex: 'param',
    key: 'param',
  }, {
    title: 'Value',
    dataIndex: 'val',
    key: 'val',
  }];

  const paramDataSource = Object.entries(params)
    .map(([key, val]) => ({ key, param: key, val }));

  return (
    <div className="emodel-details">
      <p>Seed: {seed}</p>
      <p>Score: {score}</p>

      <Collapse>
        <Panel header="Fitness" key="fitness">
          <Table
            className="small-table"
            dataSource={fitnessDataSource}
            columns={fitnessColumns}
            pagination={false}
            size="middle"
            bordered
          />
        </Panel>
        <Panel header="Optimized parameters" key="params">
          <Table
            className="small-table"
            dataSource={paramDataSource}
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
