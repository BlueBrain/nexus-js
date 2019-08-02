import * as React from 'react';

import DetailsContainer from '../containers/Details';


const DetailsView: React.FunctionComponent<{
  match: {
    params: {
      selfUrlEncoded: string;
    }
  }
}> = props => {
  const selfUrl = decodeURIComponent(props.match.params.selfUrlEncoded);

  return <DetailsContainer selfUrl={selfUrl}/>
};


export default DetailsView;
