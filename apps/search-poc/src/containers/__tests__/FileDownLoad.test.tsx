import FileDownload from '../FileDownLoad';
import React from "react";
import {  mount } from "enzyme";
import { BrowserRouter as Router } from 'react-router-dom';
import { NexusProvider } from '@bbp/react-nexus';
import { NexusClient, createNexusClient } from '@bbp/nexus-sdk';
import { setToken } from '../../utils/auth';

describe('FileDownload', () => {
    
    it('FileDownload renders correctly', () => {
        const nexus: NexusClient = createNexusClient({
            fetch,
            uri: 'test',
            links: [setToken],
          });
        const mockCallBack = jest.fn();
        const props = {
            fileIds: ['path/org/project/test-id'],
            isDownload: true,
            downloadFileName: 'test-download',
            OnShowFiles: mockCallBack
          };
        const result = mount(<NexusProvider nexusClient={nexus}><Router><FileDownload {...props} /></Router></NexusProvider>)
        expect(result).toMatchSnapshot();
    });

    it('OnShowFiles is called when toggle  is clicked', () => {
        const nexus: NexusClient = createNexusClient({
            fetch,
            uri: 'test',
            links: [setToken],
          });
        
        const mockCallBack = jest.fn();  
        const props = {
            fileIds: ['path/org/project/test-id'],
            isDownload: true,
            downloadFileName: 'test-download',
            OnShowFiles: mockCallBack
          };
        const result = mount(<NexusProvider nexusClient={nexus}><Router><FileDownload {...props} /></Router></NexusProvider>)
        result.find('button').at(0).simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    it('the download icon changes to loading when download button is clicked', () => {
        const nexus: NexusClient = createNexusClient({
            fetch,
            uri: 'test',
            links: [setToken],
          });
        
        const mockCallBack = jest.fn();  
        const props = {
            fileIds: ['path/org/project/test-id'],
            isDownload: true,
            downloadFileName: 'test-download',
            OnShowFiles: mockCallBack
          };
        const result = mount(<NexusProvider nexusClient={nexus}><Router><FileDownload {...props} /></Router></NexusProvider>)
        result.find('button').at(1).simulate('click');
        expect(result).toMatchSnapshot();
    });

});

