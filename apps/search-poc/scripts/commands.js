/**
 *
 * @param {NexusClient} nexus
 * @param {string} orgName
 */
function createOrg(nexus, orgName) {
  console.log('creating org', orgName);
  return nexus.Organization.create(orgName);
}

/**
 *
 * @param {NexusClient} nexus
 * @param {string} orgName
 * @param {string} projectName
 */
function createProject(nexus, orgName, projectName) {
  console.log('creating project', projectName);
  return nexus.Project.create(orgName, projectName, {
    description: '',
  });
}

/**
 *
 * @param {NexusClient} nexus
 * @param {string} orgName
 * @param {string} projectName
 * @param {string} payload
 */
function createSparqlView(nexus, orgName, projectName, payload) {
  console.log(orgName, projectName);
  return nexus.View.create(orgName, projectName, payload);
}

/**
 *
 * @param {NexusClient} nexus
 * @param {string} orgName
 * @param {string} projectName
 * @param {string} payload
 * @param {object} resourcePayload
 */
function createResource(nexus, orgName, projectName, resourcePayload) {
  console.log(
    'creating resource',
    resourcePayload['@id'] || resourcePayload.label,
  );
  return nexus.Resource.create(orgName, projectName, resourcePayload);
}

module.exports = {
  createOrg,
  createProject,
  createSparqlView,
  createResource,
};
