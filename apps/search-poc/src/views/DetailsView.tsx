
import * as React from 'react';

import ResourceDetailsContainer from '../containers/ResourceDetails';


const DetailsView: React.FunctionComponent<{
  location: {
    search: string;
  };
}> = props => {
  const selfUrl = (props.location.search || '').replace('?self=', '');

  return (
    <ResourceDetailsContainer selfUrl={selfUrl} />
  );
};


export default DetailsView;
