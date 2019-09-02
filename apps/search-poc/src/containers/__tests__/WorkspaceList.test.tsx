import * as renderer from "react-test-renderer";
import WorkspaceList from '../WorkspaceList';
import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from 'react-router-dom';

describe('WorkSpaceList', () => {
    const workspaceConfigs = [{
        '@id': 'id',
        label: 'work space label',
        description: 'work space description'
    }] 

    it('WorkSpaceList renders correctly', () => {
        const props = { workspaceConfig :  workspaceConfigs, onWorkspaceSelected: jest.fn, history: jest.fn};
        const result = mount(<Router><WorkspaceList {...props} /></Router>);
        expect(result).toMatchSnapshot();
    });

});

