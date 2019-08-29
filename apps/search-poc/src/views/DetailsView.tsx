
import * as React from 'react';

import ResourceDetailsContainer from '../containers/ResourceDetails';
import history from '../history';
import { HandleClickParams } from '../types';


const DetailsView: React.FunctionComponent<{
  location: {
    search: string;
  };
}> = props => {
  const selfUrl = (props.location.search || '').replace('?self=', '');

  const handleClick = (params: HandleClickParams) => {
    history.push(`/resources?self=${params.self}`);
  }

  return (
    <ResourceDetailsContainer
      selfUrl={selfUrl}
      handleClick={handleClick}
    />
  );
};


export default DetailsView;
