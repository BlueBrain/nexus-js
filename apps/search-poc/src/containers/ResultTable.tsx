import * as React from 'react';
import { useNexus } from '@bbp/react-nexus';
import { Spin } from 'antd';
import ResultTable from '../components/ResultTable';
import { Binding } from '@babel/traverse';

const ResultTableContainer: React.FunctionComponent<{
  dataQuery: string;
  orgLabel: string;
  projectLabel: string;
  viewId: string;
}> = props => {
  const { loading, data, error } = useNexus<any>(
    nexus =>
      nexus.View.sparqlQuery(
        props.orgLabel,
        props.projectLabel,
        props.viewId,
        props.dataQuery,
      ),
    [props.dataQuery],
  );

  if (error) {
    return (
      <>
        <p>Something went wrong</p>
        <p>{error.message}</p>
      </>
    );
  }
  if (loading) {
    return <Spin />;
  }

  // get total
  const total = data.results.bindings.find(
    (binding: any) => binding.total && binding.total.value !== '0',
  ).total.value;

  // build items
  const items = data.results.bindings
    .filter(binding => binding.self)
    .map(binding => ({
      id: binding.self.value,
      name: binding.name.value,
      self: binding.self.value,
    }));

  console.log(items);
  return (
    <ResultTable
      headerProperties={[
        { title: 'Name', dataIndex: 'name' },
        { title: 'Self', dataIndex: 'self' },
      ]}
      items={items}
      total={total}
    />
  );
};

export default ResultTableContainer;
