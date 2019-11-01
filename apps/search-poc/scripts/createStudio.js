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
  modelCollectionDashboard,
} = require('./resources');

const config = {
  environment: 'https://bbp.epfl.ch/nexus/v1',
  orgName: 'bbp', // MUST ALREADY EXIST
  projectName: 'studio', // MUST ALREADY EXIST
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
  token: '', // PUT YOUR TOKEN HERE
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
    const ThalamusWorkspaceConfig = {
      name: 'Thalamus 2019',
      label: 'thalamus',
      viewId: 'nxv:thalamusSparqlIndex',
      aggregateStudioProjects: [
        ['nse/test', 'nxv:defaultSparqlIndex'],
        ['bbp/thalamus', 'nxv:defaultSparqlIndex'],
      ],
    };

    const SscxWorkspaceConfig = {
      name: 'SSCx dissemination',
      label: 'sscx',
      viewId: 'nxv:sscxSparqlIndex',
      aggregateStudioProjects: [
        ['nse/test2', 'nxv:defaultSparqlIndex'],
      ],
    };

    try {
      await createOrUpdateResource(
        config.orgName,
        config.projectName,
        studioContext,
      );
    } catch {}

    // Generate each workspace!
    const workspaceIdsPromises = [
      ThalamusWorkspaceConfig,
      SscxWorkspaceConfig,
    ].map(async workspaceConfig => {
      // WARNING: We need to wait for the context resource to be indexed

      try {
        // TODO: fix this to use upsert
        console.log(`Attempting to update Sparql view ${workspaceConfig.viewId}`);
        await nexus.View.create(
          config.orgName,
          config.projectName,
          generateStudioView(workspaceConfig.viewId, workspaceConfig.aggregateStudioProjects),
        );
      } catch(err) {
        console.error(err);
      }

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
      const { '@id': modelCollectionDashboardId } = await createOrUpdateResource(
        config.orgName,
        config.projectName,
        modelCollectionDashboard(workspaceConfig),
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
          [emodelDashboardId, workspaceConfig.viewId],
          [morphoDashboardId, workspaceConfig.viewId],
          [circuitsDashboardId, workspaceConfig.viewId],
          [modelCollectionDashboardId, workspaceConfig.viewId],
          [simulationsCampaignDashboardId, workspaceConfig.viewId],
          [modelCellCollectionDashboardId, workspaceConfig.viewId],
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
