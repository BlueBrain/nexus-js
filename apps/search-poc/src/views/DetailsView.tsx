import * as React from 'react';
import { withRouter, History } from 'react-router-dom';

import ResourceDetailsContainer from '../containers/ResourceDetails';

const DetailsView: React.FunctionComponent<{
  location: {
    search: string;
  };
  history: History;
}> = props => {
  const selfUrl = (props.location.search || '').replace('?self=', '');
  const goToResource = selfUrl =>
    props.history.push(`/resources/?self=${selfUrl}`);

  return (
    <ResourceDetailsContainer selfUrl={selfUrl} goToResource={goToResource} />
  );
};

export default withRouter(DetailsView);
