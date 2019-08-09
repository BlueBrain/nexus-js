/**
 * This script is used to bootstrap a new studio
 * It will:
 *  - create the org/project that will host the necessary config files
 *  - create a aggregated sparql view of the required project
 *  - create default workspaces and dashboards
 */
const { createNexusClient } = require('@bbp/nexus-sdk');
const fetch = require('node-fetch');
require('abort-controller/polyfill');

const {
  createOrg,
  createProject,
  createResource,
  createSparqlView,
} = require('./commands');
const {
  generateStudioResource,
  generateStudioView,
  generateWorkspaceResource,
  studioContext,
  emodelsCollectionDashboard,
  morphologyCollectionDashboard,
} = require('./resources');

const config = {
  environment: 'https://dev.nexus.ocp.bbp.epfl.ch/v1',
  orgName: 'bbp', // MUST ALREADY EXIST
  projectName: 'studio', // MUST ALREADY EXIST
  aggregateStudioProjects: [
    ['pgetta-data/proj1', 'nxv:defaultSparqlIndex'],
    ['pgetta-data/proj32', 'nxv:defaultSparqlIndex'],
    ['pgetta-data/proj38', 'nxv:defaultSparqlIndex'],
    ['pgetta-data/proj42', 'nxv:defaultSparqlIndex'],
    ['pgetta-data/proj55', 'nxv:defaultSparqlIndex'],
    ['pgetta-data/proj59', 'nxv:defaultSparqlIndex'],
    ['pgetta-data/proj64', 'nxv:defaultSparqlIndex'],
    ['pgetta-data/proj66', 'nxv:defaultSparqlIndex'],
    ['pgetta-data/proj68', 'nxv:defaultSparqlIndex'],
  ],
};

const nexus = createNexusClient({
  fetch,
  uri: config.environment,
  token: '', // PUT YOUR TOKEN HERE
});

async function main() {
  try {
    // await createOrg(nexus, config.orgName);
    // await createProject(nexus, config.orgName, config.projectName); // that won't work. need to wait for views to be available
    await createSparqlView(
      nexus,
      config.orgName,
      config.projectName,
      generateStudioView(config.aggregateStudioProjects),
    );
    await createResource(
      nexus,
      config.orgName,
      config.projectName,
      studioContext,
    );
    const { ['@id']: emodelDashboardId } = await createResource(
      nexus,
      config.orgName,
      config.projectName,
      emodelsCollectionDashboard,
    );
    const { ['@id']: morphoDashboardId } = await createResource(
      nexus,
      config.orgName,
      config.projectName,
      morphologyCollectionDashboard,
    );
    const { ['@id']: thalamus2019WorkspaceId } = await createResource(
      nexus,
      config.orgName,
      config.projectName,
      generateWorkspaceResource('Thalamus2019 Workspace', [
        [emodelDashboardId, 'nxv:StudioSparqlView'],
        [morphoDashboardId, 'nxv:StudioSparqlView'],
      ]),
    );
    await createResource(
      nexus,
      config.orgName,
      config.projectName,
      generateStudioResource([thalamus2019WorkspaceId]),
    );
    console.log('Success!');
  } catch (e) {
    console.error('Script has crashed... \n', e);
  }
}
main();
