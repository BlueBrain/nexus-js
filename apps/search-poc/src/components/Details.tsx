import * as React from "react";
import { Spin } from 'antd';
import get from 'lodash/get';


export interface BrainRegion {
  '@id': string;
  label: string;
}

export interface BrainLocation {
  brainRegion: BrainRegion;
}

export interface CommonResource {
  '@id': string;
  brainLocation: BrainLocation;
  name: string;
  description: string;
}


const DetailsComponent: React.FunctionComponent<{
  data: CommonResource;
  loading: boolean;
  error: Error;
}> = props => {
  const { data, loading, error } = props;

  const id = get(data, '@id');
  const name = get(data, 'name');
  const description = get(data, 'description');

  const brainRegion = get(data, 'brainLocation.brainRegion', {});
  const brainRegionId = brainRegion['@id'];
  const brainRegionLabel = brainRegion.label;

  return (
    <div className={error ? 'details error' : 'details'}>
      <Spin tip="Loading..." spinning={loading}>
        <h1>Common entity details</h1>

        {error && <p>{error.message}</p>}

        {data && <div>
          <p>Id: {id}</p>
          <p>
            Brain region: &nbsp;
            <a
              href={brainRegionId}
              rel="noopener noreferrer"
              target="_blank"
            >
              {brainRegionLabel}
            </a>
          </p>
          <p>Name: {name}</p>
          <p>Description: {description}</p>
        </div>}
      </Spin>
    </div>
  );
};


export default DetailsComponent;
