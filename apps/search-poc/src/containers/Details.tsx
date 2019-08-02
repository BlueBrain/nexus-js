import * as React from 'react';
import { useNexus } from '@bbp/react-nexus';

import DetailsComponent from '../components/Details';


const DetailsContainer: React.FunctionComponent<{
  selfUrl: string;
}> = props => {
  const { data, loading, error } = useNexus(nexus => nexus.httpGet({ path: props.selfUrl }));

  return <DetailsComponent
    data={data}
    loading={loading}
    error={error}
  />
};


export default DetailsContainer;
