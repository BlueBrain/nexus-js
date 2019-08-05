import * as React from 'react';

import ResourceDetailsContainer from '../containers/ResourceDetails';

const DetailsView: React.FunctionComponent<{
  match: {
    params: {
      selfUrlEncoded: string;
    };
  };
}> = props => {
  const selfUrl = decodeURIComponent(props.match.params.selfUrlEncoded);

  return <ResourceDetailsContainer selfUrl={selfUrl} />;
};

export default DetailsView;
