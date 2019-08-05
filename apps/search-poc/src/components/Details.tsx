import * as React from "react";


const DetailsComponent: React.FunctionComponent<{
  id: string;
  name: string;
  description: string;
  brainRegion: {
    id: string;
    label: string;
  };
}> = props => {
  return (
    <div className="Details">
        <h1>Common entity details</h1>

        <div>
          <p>Id: {props.id}</p>
          <p>
            Brain region: &nbsp;
            <a
              href={props.brainRegion.id}
              rel="noopener noreferrer"
              target="_blank"
            >
              {props.brainRegion.label}
            </a>
          </p>
          <p>Name: {props.name}</p>
          <p>Description: {props.description}</p>
        </div>
    </div>
  );
};


export default DetailsComponent;
