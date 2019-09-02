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

const studioData = {
    id: 'id',
    description: 'A description',
    label: 'A label',
    workspaces: [{
        id: 'id',
        description: 'A description',
        label: 'A label',
        dashboards: [{
            dashboard: {
                id: 'id',
                dataQuery: 'A valid query',
                description:'Some description',
                label: 'Morphology curation pipeline'
            },
            view: {
                id: "https://bluebrain.github.io/nexus/vocabulary/StudioSparqlView",
                deployment: "https://staging.nexus.ocp.bbp.epfl.ch/v1",
                entityType: "project",
                id: undefined,
                org: "bbp_test",
                project: "studio",
                schema: undefined
            }
        }]
    }]
}