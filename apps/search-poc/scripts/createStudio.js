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
  projectName: 'studio2', // MUST ALREADY EXIST
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

const logger = (operation, forward) => {
  const { method = 'GET', path, body = {} } = operation;
  const { ['@id']: id, label } = JSON.parse(body);
  const type = path.split('/').reduce((prev, curr) => {
    if (curr === 'v1') return curr;
    if (prev === 'v1') return curr;
    return prev;
  });
  console.log(`${method} ${id || label || ''} on ${type}`);
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
    // await nexus.Organization.create(config.orgName);
    // await nexus.Project.create(config.orgName, config.projectName);
    // WARNING: If we create the project in that script,
    // the stuff below won't work because we need to wait for views to be available
    // and especially for the context resource to be indexed
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
    const { ['@id']: emodelDashboardId } = await nexus.Resource.create(
      config.orgName,
      config.projectName,
      emodelsCollectionDashboard,
    );
    const { ['@id']: morphoDashboardId } = await nexus.Resource.create(
      config.orgName,
      config.projectName,
      morphologyCollectionDashboard,
    );
    const { ['@id']: thalamus2019WorkspaceId } = await nexus.Resource.create(
      config.orgName,
      config.projectName,
      generateWorkspaceResource('Thalamus2019 Workspace', [
        [emodelDashboardId, 'nxv:StudioSparqlView'],
        [morphoDashboardId, 'nxv:StudioSparqlView'],
      ]),
    );
    await nexus.Resource.create(
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
