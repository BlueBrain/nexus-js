import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import ResourceDetailsContainer from '../containers/ResourceDetails';
import { HandleClickParams } from '../types';

const DetailsView: React.FunctionComponent<RouteComponentProps> = props => {
  const selfUrl = (props.location.search || '').replace('?self=', '');

  const handleClick = (params: HandleClickParams) => {
    props.history.push(`/resources?self=${params.self}`);
  };

  return (
    <ResourceDetailsContainer selfUrl={selfUrl} handleClick={handleClick} />
  );
};

export default withRouter(DetailsView);
