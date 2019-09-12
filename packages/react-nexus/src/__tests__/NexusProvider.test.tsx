import React from 'react';
import { shallow } from 'enzyme';
import NexusProvider from '../NexusProvider'; 
import useNexusContext from '../useNexusContext';
import  useNexus  from '../useNexus';




const App = ()  => {
    const nexus = useNexusContext();
    return (
        <div>
            {nexus}
        </div>
    );
}


const AppNexus: React.SFC<any> = () => {
    const org = useNexus(nexus => nexus.Organization.get('test'), ['test']);    
    return (
        <div>
            {org}
        </div>
    );
}

describe('NexusProvider and useNexusContext',() => {
    it('useNexusContext can access the value provided by NexusProvider',  () => {
        const nexus = {
            aValue: "This is a value"
        };
    
        const result =  shallow(
            <NexusProvider nexusClient={nexus} >
                <App />
            </NexusProvider>
        );
        expect(result).toMatchSnapshot();
    });

    it('useNexus access the NexusContext through useNexusContext',  () => {
        const nexus = {
            Organization: {
                list: [{ name: 'org1'}]
            }
        };
          
        const result =  shallow(
            <NexusProvider nexusClient={nexus} >
                <AppNexus />
            </NexusProvider>
        );
        expect(result).toMatchSnapshot();      
        
    })    
})
