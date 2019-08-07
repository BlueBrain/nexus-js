import * as React from 'react';
import { useNexus } from '@bbp/react-nexus';
import { Spin } from 'antd';

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
  console.log(data);
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

  return <p>{JSON.stringify(data)}</p>;
};

export default ResultTableContainer;
