import React from 'react';
import { shallow, mount } from 'enzyme';
import useMorphology from '../useMorphology.ts';
import { Resource } from '@bbp/nexus-sdk';
import { useNexusContext } from "@bbp/react-nexus";




jest.mock('@bbp/react-nexus', () => ({
    useNexusContext: () => ({
        File: ({
            get: () => (new Promise((resolve) => {
                resolve({
                    sections: [],
                    soma: {}
                });
            }))
        })
    })
}));



jest.mock('../../utils/morph', () => ({
    convertToSwc: (m) => (m),
    parseSwc: (m) => (m),
}));

jest.setTimeout(1000);

const TestHook:React.FunctionComponent< { hook: () => void; }> = ({hook}) => {
    const org = 'org';
    const proj = 'project';
    const id = 'id';
    const divElement = React.createRef<HTMLDivElement>();
    const { morphology, loading, stage, error } =   hook(
    {
      org,
      proj,
      id,
    },
    divElement,
  );
  return (
    <div > 
        {stage} 
        {loading} 
    </div>
  );
};








it('should throw no errors',  () => {
    const result = mount(<TestHook  hook={useMorphology} />);
    expect(result.exists()).toBeTruthy();
});


it('should render stage',  () => {
    const result =  mount(<TestHook  hook={useMorphology} />);
    expect(result).toMatchSnapshot();
});