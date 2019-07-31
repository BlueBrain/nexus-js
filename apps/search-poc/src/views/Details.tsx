import * as React from 'react';

const Details: React.FunctionComponent<{
  id: string;
}> = props => {
  return (
    <div className="Details">
      <h1>Stuff!! {props.id}</h1>
    </div>
  );
};

export default Details;
