import * as React from 'react';
import { useNexus } from '@bbp/react-nexus';
import { Spin } from 'antd';
import { withRouter, History } from 'react-router-dom';
import ResultTable from '../components/ResultTable';
import { labelOf } from '../utils';

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
        props.viewId,
        props.dataQuery,
      ),
    [props.dataQuery],
  );

  const handleRowClick = (index, items) => {
    props.history.push(`/resources/?self=${items[index].self}`);
  };

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
  const total = data.results.bindings
    .filter((binding: any) => binding.total && binding.total.value !== '0')
    .reduce((total, binding) => total + parseInt(binding.total.value), 0);

  // build items
  const items = data.results.bindings
    .filter(binding => binding.self)
    .map(binding => ({
      id: labelOf(decodeURIComponent(binding.self.value)),
      name: binding.name.value,
      speciesLabel: binding.speciesLabel && binding.speciesLabel.value,
      self: binding.self.value,
      key: binding.self.value,
    }));

  return (
    <ResultTable
      headerProperties={[
        { title: 'Name', dataIndex: 'name' },
        { title: 'Species', dataIndex: 'speciesLabel' },
      ]}
      items={items}
      total={total}
      onRowClick={(_, index) => handleRowClick(index, items)}
    />
  );
};

export default withRouter(ResultTableContainer);
