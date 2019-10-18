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
  environment: 'https://bbp.epfl.ch/nexus/v1',
  orgName: 'nse', // MUST ALREADY EXIST
  projectName: 'test', // MUST ALREADY EXIST
  aggregateStudioProjects: [
    ['nse/test', 'nxv:defaultSparqlIndex'],
  ],
};

// const logger = (operation, forward) => {
//   const { method = 'GET', path, body = '{}' } = operation;
//   const { '@id': id = null, label = null } = JSON.parse(body);
//   const type = path.split('/').reduce((prev, curr) => {
//     if (curr === 'v1') return curr;
//     if (prev === 'v1') return curr;
//     return prev;
//   });
//   console.log(`operation => ${method} ${id || label || ''} on ${type}`);
//   return forward(operation);
// };

const nexus = createNexusClient({
  fetch,
  uri: config.environment,
  token: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJONS1CU0ZxZG5NS3Y4SWtKUkg1R3E0LVA2c1RWQUxwU0EydGNQeEpWM1NBIn0.eyJqdGkiOiI4MjAyOTFkMy1iNDYwLTQwNmEtOWRiNS0xNTgzNjJiNjdjMWEiLCJleHAiOjE1NzA1NTQwMTIsIm5iZiI6MCwiaWF0IjoxNTcwNTI1MjEyLCJpc3MiOiJodHRwczovL2JicHRlYW0uZXBmbC5jaC9hdXRoL3JlYWxtcy9CQlAiLCJzdWIiOiJmOjlkNDZkZGQ2LTEzNGUtNDRkNi1hYTc0LWJkZjAwZjQ4ZGZjZTpnZXR0YSIsInR5cCI6IkJlYXJlciIsImF6cCI6Im5leHVzLXdlYiIsIm5vbmNlIjoiYjFjN2I1MDI2ZmRjNDk0YjlmYjQwNzhmZWYzY2I5M2EiLCJhdXRoX3RpbWUiOjE1NzA1MjUyMTEsInNlc3Npb25fc3RhdGUiOiJkNGQ1OTA4Yy02OTg2LTRkYjYtOTU4ZC05ZjA4MDNlN2JhNzYiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vZGV2Lm5leHVzLm9jcC5iYnAuZXBmbC5jaCIsImh0dHBzOi8vYmJwLmVwZmwuY2giLCJodHRwOi8vZGV2Lm5leHVzLm9jcC5iYnAuZXBmbC5jaCIsImh0dHBzOi8vc3RhZ2luZy5uZXh1cy5vY3AuYmJwLmVwZmwuY2giLCJodHRwczovL2JicC1uZXh1cy5lcGZsLmNoIiwiaHR0cHM6Ly9iYnB0ZWFtLmVwZmwuY2giLCJodHRwOi8vc3RhZ2luZy5uZXh1cy5vY3AuYmJwLmVwZmwuY2giXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIl19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiUGF2bG8gR2V0dGEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJnZXR0YSIsImdpdmVuX25hbWUiOiJQYXZsbyIsImZhbWlseV9uYW1lIjoiR2V0dGEiLCJlbWFpbCI6InBhdmxvLmdldHRhQGVwZmwuY2gifQ.CF-ddGMGjaK40mp6RApBhEQ_JrC6aMUbrPHb5VgBqFTcsMQHhN-px-zKLCvOf3uwWq0dNXKWyev0x_IXhfsYjbDEHXzuqpEbVkhxovC5UvvzLB1QvzkZiY-iQ_PGbRv2FkKYKwFqpenfk5UmbkGTE-UtvQ35pxWx-_4-gabRj-oYkUYCypaGlJqBSfgADQJ53aqX-NA7iMbNHGxgwhKE20XdZqZ4yH2eKQLXTrgo2Wyd7KJgmyiEnk30YjhA6EIWehwlPMsS42awcs0IDBozRKX_JFu716rY0MI2I-QqfyTgDwmlQTfPLF55KSM6bblxrlQUPNGaEYcnUO6LPcTtgQ', // PUT YOUR TOKEN HERE
  // links: [logger],
});


async function createOrUpdateResource(orgName, projectName, resource) {
  const id = resource['@id'];
  const escapedId = encodeURIComponent(id);
  if (!id) {
    throw new Error('createOrUpdateResource method requires @id attribute to be present in resource');
  }

  let currentResource = null;
  try {
    currentResource = await nexus.Resource.get(orgName, projectName, escapedId);
  } catch (e) {}

  if (currentResource) {
    const rev = currentResource['_rev'];
    console.log(`Updating id ${id}`);
    return await nexus.Resource.update(orgName, projectName, escapedId, rev, resource);
  } else {
    console.log(`Creating id: ${id}`);
    return await nexus.Resource.create(orgName, projectName, resource);
  }
}

async function main() {
  try {
    const BBPConfig = {
      name: 'BBP Workspace',
      label: 'default',
    };

    try {
      await nexus.View.create(
        config.orgName,
        config.projectName,
        generateStudioView(config.aggregateStudioProjects),
      );
    } catch {}

    try {
      await createOrUpdateResource(
        config.orgName,
        config.projectName,
        studioContext,
      );
    } catch {}

    // Generate each workspace!
    const workspaceIdsPromises = [
      BBPConfig,
    ].map(async workspaceConfig => {
      // WARNING: We need to wait for the context resource to be indexed
      const { '@id': emodelDashboardId } = await createOrUpdateResource(
        config.orgName,
        config.projectName,
        emodelsCollectionDashboard(workspaceConfig),
      );
      const { '@id': morphoDashboardId } = await createOrUpdateResource(
        config.orgName,
        config.projectName,
        morphologyCollectionDashboard(workspaceConfig),
      );
      const { '@id': circuitsDashboardId } = await createOrUpdateResource(
        config.orgName,
        config.projectName,
        circuitsDashboard(workspaceConfig),
      );
      const {
        '@id': simulationsCampaignDashboardId,
      } = await createOrUpdateResource(
        config.orgName,
        config.projectName,
        simulationsCampaignDashboard(workspaceConfig),
      );
      const {
        '@id': modelCellCollectionDashboardId,
      } = await createOrUpdateResource(
        config.orgName,
        config.projectName,
        modelCellCollectionDashboard(workspaceConfig),
      );
      const { '@id': workspaceId } = await createOrUpdateResource(
        config.orgName,
        config.projectName,
        generateWorkspaceResource(workspaceConfig, [
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

    // Generate the "root" Studio!
    await createOrUpdateResource(
      config.orgName,
      config.projectName,
      generateStudioResource(workspaceIds),
    );

    console.log('Success!');
  } catch (e) {
    console.log('Script has crashed... \n');
    console.error(e);
  }
}
main();
