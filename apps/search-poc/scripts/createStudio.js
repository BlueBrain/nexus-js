/**
 * This script is used to bootstrap a new studio
 * It will:
 *  - create a aggregated sparql view of the required project
 *  - create default workspaces and dashboards
 */
const { createNexusClient } = require('@bbp/nexus-sdk');
const fetch = require('node-fetch');
require('abort-controller/polyfill');

const {
  generateStudioResource,
  generateStudioView,
  generateWorkspaceResource,
  studioContext,
  emodelsCollectionDashboard,
  morphologyCollectionDashboard,
  circuitsDashboard,
  simulationsCampaignDashboard,
  modelCellCollectionDashboard,
} = require('./resources');

const config = {
  environment: 'https://staging.nexus.ocp.bbp.epfl.ch/v1',
  orgName: 'bbp_test', // MUST ALREADY EXIST
  projectName: 'studio', // MUST ALREADY EXIST
  aggregateStudioProjects: [
    ['bbp_test/proj1', 'nxv:defaultSparqlIndex'],
    ['bbp_test/proj32', 'nxv:defaultSparqlIndex'],
    ['bbp_test/proj38', 'nxv:defaultSparqlIndex'],
    ['bbp_test/proj42', 'nxv:defaultSparqlIndex'],
    ['bbp_test/proj55', 'nxv:defaultSparqlIndex'],
    ['bbp_test/proj59', 'nxv:defaultSparqlIndex'],
    ['bbp_test/proj64', 'nxv:defaultSparqlIndex'],
    ['bbp_test/proj66', 'nxv:defaultSparqlIndex'],
    ['bbp_test/proj68', 'nxv:defaultSparqlIndex'],
  ],
};

const logger = (operation, forward) => {
  const { method = 'GET', path, body = '{}' } = operation;
  const { '@id': id = null, label = null } = JSON.parse(body);
  const type = path.split('/').reduce((prev, curr) => {
    if (curr === 'v1') return curr;
    if (prev === 'v1') return curr;
    return prev;
  });
  console.log(`operation => ${method} ${id || label || ''} on ${type}`);
  return forward(operation);
};

const nexus = createNexusClient({
  fetch,
  uri: config.environment,
  token: '', // PUT YOUR TOKEN HERE
  links: [logger],
});

async function main() {
  try {
    const ThalamusWorkspaceConfig = {
      name: 'Thalamus2019 Workspace',
      filters: {
        brainRegion: 'http://purl.obolibrary.org/obo/UBERON_0004703',
      },
    };
    const NeocortexWorkspaceConfig = {
      name: 'SSCx 2019 Workspace',
      filters: {
        brainRegion: 'http://purl.obolibrary.org/obo/UBERON_0008933',
      },
    };
    const BBPOverviewConfig = {
      name: 'BBP Overview Workspace',
    };

    // await nexus.Organization.create(config.orgName);
    // await nexus.Project.create(config.orgName, config.projectName, {
    //   description: 'a nice studio',
    // });
    await nexus.View.create(
      config.orgName,
      config.projectName,
      generateStudioView(config.aggregateStudioProjects),
    );
    await nexus.Resource.create(
      config.orgName,
      config.projectName,
      studioContext,
    );

    // Generate each workspace!
    const workspaceIdsPromises = [
      ThalamusWorkspaceConfig,
      BBPOverviewConfig,
      NeocortexWorkspaceConfig,
    ].map(async workspaceConfig => {
      // WARNING: We need to wait for the context resource to be indexed
      const { '@id': emodelDashboardId } = await nexus.Resource.create(
        config.orgName,
        config.projectName,
        emodelsCollectionDashboard(workspaceConfig.filters),
      );
      const { '@id': morphoDashboardId } = await nexus.Resource.create(
        config.orgName,
        config.projectName,
        morphologyCollectionDashboard(workspaceConfig.filters),
      );
      const { '@id': circuitsDashboardId } = await nexus.Resource.create(
        config.orgName,
        config.projectName,
        circuitsDashboard(workspaceConfig.filters),
      );
      const {
        '@id': simulationsCampaignDashboardId,
      } = await nexus.Resource.create(
        config.orgName,
        config.projectName,
        simulationsCampaignDashboard(workspaceConfig.filters),
      );
      const {
        '@id': modelCellCollectionDashboardId,
      } = await nexus.Resource.create(
        config.orgName,
        config.projectName,
        modelCellCollectionDashboard(workspaceConfig.filters),
      );
      const { '@id': workspaceId } = await nexus.Resource.create(
        config.orgName,
        config.projectName,
        generateWorkspaceResource(workspaceConfig.name, [
          [emodelDashboardId, 'nxv:StudioSparqlView'],
          [morphoDashboardId, 'nxv:StudioSparqlView'],
          [circuitsDashboardId, 'nxv:StudioSparqlView'],
          [simulationsCampaignDashboardId, 'nxv:StudioSparqlView'],
          [modelCellCollectionDashboardId, 'nxv:StudioSparqlView'],
        ]),
      );

      return workspaceId;
    });

    const workspaceIds = await Promise.all(workspaceIdsPromises);

    await nexus.Resource.create(
      config.orgName,
      config.projectName,
      generateStudioResource(workspaceIds),
    );

    console.log('Success!');
  } catch (e) {
    console.error('Script has crashed... \n', e);
  }
}
main();
