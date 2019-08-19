import * as React from 'react';
import { useNexus } from '@bbp/react-nexus';
import { Spin, Alert } from 'antd';
import { withRouter, History } from 'react-router-dom';
import ResultTable from '../components/ResultTable';
import { getLabel } from '../utils';

const ResultTableContainer: React.FunctionComponent<{
  dataQuery: string;
  orgLabel: string;
  projectLabel: string;
  viewId: string;
  history: History;
}> = props => {
  const { loading, data, error } = useNexus<any>(
    nexus =>
      nexus.View.sparqlQuery(
        props.orgLabel,
        props.projectLabel,
        encodeURIComponent(props.viewId),
        props.dataQuery,
      ),
    [props.dataQuery],
  );

  const handleRowClick = (index, items) => {
    props.history.push(`/resources/?self=${items[index].self}`);
  };

  if (error) {
    return (
      <Alert
        message="Error loading dashboard"
        description={`Something went wrong: ${error.message || error}`}
        type="error"
      />
    );
  }

  // get total
  const total =
    data &&
    data.results.bindings
      .filter((binding: any) => binding.total && binding.total.value !== '0')
      .reduce((total, binding) => total + parseInt(binding.total.value), 0);

  // build header properties
  const headerProperties: {
    title: string;
    dataIndex: string;
  }[] =
    data &&
    data.head.vars
      .filter(
        // we don't want to display total or self url in result table
        headVar => !(headVar === 'total' || headVar === 'self'),
      )
      .map(headVar => ({
        title: headVar, // TODO: get the matching title from somewhere?
        dataIndex: headVar,
      }));

  // build items
  const items =
    data &&
    data.results.bindings
      // we only want resources
      .filter(binding => binding.self)
      .map(binding => {
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
          total={total}
          onRowClick={(_, index) => handleRowClick(index, items)}
        />
      )}
    </Spin>
  );
};

export default withRouter(ResultTableContainer);
