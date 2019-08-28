import * as React from 'react';
import { useNexus } from '@bbp/react-nexus';
import { Spin, Alert } from 'antd';
import ResultTable from '../components/ResultTable';
import { getLabel, camelCaseToLabelString } from '../utils';

export type Binding = {
  [key: string]: {
    dataType?: string;
    type: string;
    value: string;
  };
};

type Item = {
  id: string;
  self: string;
  key: string;
  [key: string]: any;
};

const ResultTableContainer: React.FunctionComponent<{
  dataQuery: string;
  orgLabel: string;
  projectLabel: string;
  viewId: string;
  handleRowClick?: (index: number, items: Item[]) => void;
}> = props => {
  const { loading, data, error } = useNexus<any>(
    nexus =>
      nexus.View.sparqlQuery(
        props.orgLabel,
        props.projectLabel,
        encodeURIComponent(props.viewId),
        props.dataQuery,
      ),
    [props.dataQuery, props.viewId], // only trigger new call if we have a new query and a new view
  );

  if (error) {
    return (
      <Alert
        message="Error loading dashboard"
        description={`Something went wrong: ${error.message || error}`}
        type="error"
      />
    );
  }

  // build header properties
  const headerProperties: {
    title: string;
    dataIndex: string;
  }[] =
    data &&
    data.head.vars
      .filter(
        // we don't want to display total or self url in result table
        (headVar: string) => !(headVar === 'total' || headVar === 'self'),
      )
      .map((headVar: string) => ({
        title: camelCaseToLabelString(headVar), // TODO: get the matching title from somewhere?
        dataIndex: headVar,
      }));

  // build items
  const items =
    data &&
    data.results.bindings
      // we only want resources
      .filter((binding: Binding) => binding.self)
      .map((binding: Binding) => {
        // let's get the value for each headerProperties
        const properties = headerProperties.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.dataIndex]:
              (binding[curr.dataIndex] && binding[curr.dataIndex].value) ||
              undefined,
          }),
          {},
        );

        // return item data
        return {
          ...properties, // our properties
          id: getLabel(decodeURIComponent(binding.self.value)), // id is used by antd component
          self: binding.self.value, // used in order to load details or resource once selected
          key: binding.self.value, // used by react component (unique key)
        };
      });

  return (
    <Spin spinning={loading}>
      {data && (
        <ResultTable
          headerProperties={headerProperties}
          items={items}
          onRowClick={(_, index) =>
            props.handleRowClick && props.handleRowClick(index, items)
          }
        />
      )}
    </Spin>
  );
};

export default ResultTableContainer;
