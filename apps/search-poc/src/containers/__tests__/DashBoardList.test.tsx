import * as renderer from "react-test-renderer";
import DashboardListContainer from '../DashboardList';
import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from 'react-router-dom';

describe('dashboardList', () => {
    const dashBoardContainer = {
        '@id': 'id',
        '@type': 'type',
        label: 'label',
        description: 'description',
        dataQuery: 'query'
    };
    const view = {
        '@id': 'id',
        org: 'org',
        project: 'project'
    };
    const dashboardConfigs = [{
        dashboard: dashBoardContainer,
        view: view
    }] 

    it('DashboardList renders correctly', () => {
        const props = { dashboardConfig :  dashboardConfigs, workspaceId: 'id', history: jest.fn, onDashboardSelected: jest.fn};
        const result = mount(<Router><DashboardListContainer {...props} /></Router>);
        expect(result).toMatchSnapshot();
    });

});
