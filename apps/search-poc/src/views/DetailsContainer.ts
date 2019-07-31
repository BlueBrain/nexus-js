import * as React from "react";

import useEntity from '../hooks/useEntity';
import Details from '../components/Details';

const DetailsContainer: React.FunctionComponent<{
  params: {
    selfUrl: string;
  };
}> = props => {
  const { entity, loading, error } = useEntity(props.params.selfUrl);
  return Details({ entity, loading, error});
};

export default DetailsContainer;
