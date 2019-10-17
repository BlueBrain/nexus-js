import ResultTableContainer from '../ResultTable';
import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from 'react-router-dom';
import { NexusProvider } from '@bbp/react-nexus';
import { NexusClient, createNexusClient } from '@bbp/nexus-sdk';
import {  setToken } from '../../utils/auth.ts';

describe('ResultTableContainer', () => {
    
    it('ResultTableContainer renders correctly', () => {
        const nexus: NexusClient = createNexusClient({
            fetch,
            uri: 'test',
            links: [setToken],
          });
        const props = {
            dataQuery: 'a query',
            orgLabel: 'org',
            projectLabel: 'project Label',
            viewId: 'viewId',
            handleRowClick: jest.fn
          };
        const result = mount(<NexusProvider nexusClient={nexus}><Router><ResultTableContainer {...props} /></Router></NexusProvider>)
        expect(result).toMatchSnapshot();
    });

});

