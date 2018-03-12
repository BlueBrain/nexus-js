'use strict';
const BASE_PATH = 'https://bbp-nexus.epfl.ch/v0';
/**
 * retrieve schemas listing optionally for particular org and domain
 * @param {string} org - name of organization
 * @param {string} domain - name of domain
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom URI for Nexus instance
 * @param {boolean} fetchAll - whether to fetch all instances or just 1 page
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function getSchemasList(org, domain, options = {}, API_PATH, fetchAll, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['schemas', org, domain], options);
  return fetchWrapper(uri, {}, fetchAll, access_token);
}

/**
 * Returns search results for instances
 * @param {string} query - Query string
 * @param {string} org - organization
 * @param {string} domain - domain
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {boolean} fetchAll - whether to fetch all instances or just 1 page
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function searchInstance(query, org, domain, API_PATH, fetchAll, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['data'], { q: 'query' });
  return fetchWrapper(uri, {}, fetchAll, access_token);
}

/**
 * Retrievs instances by its schema version
 * @param {string} org - organization
 * @param {string} domain - domain
 * @param {string} schema - schema
 * @param {ver} ver - version of schema
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {boolean} fetchAll - whether to fetch all instances or just 1 page
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function getInstancesList(org, domain, schema, ver, options = {}, API_PATH, fetchAll, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['data', org, domain, schema, ver], options);
  return fetchWrapper(uri, {}, fetchAll, access_token);
}

/**
 * Wrapper around native fetch to pass all params
 * @param {string} url - actual url for request
 * @param {Object} result - accumulated response by default just an empty object
 * @param {Boolean} fetchAll - bool flag for recursive call up to the end of results
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function fetchWrapper(url, result, fetchAll, access_token) {
  fetchAll = Boolean(fetchAll);
  const requestOptions = access_token? { headers: { "Authorization": "Bearer "+ access_token } }: {};
  return fetch(url, requestOptions)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Error occured while fetching ${url}`);
  })
  .then(({ total, results, links}) => {
    result.total = total;
    result.results = result.results || [];
    result.results = result.results.concat(results);
    result.links = Object.assign({}, result.links, links);
    if (fetchAll && results && results.length === 10) {
      return fetchWrapper(links['next'], result);
    }
    return result;
  })
  .catch(err => {
    console.error(err);
  })
}
/**
 * Retrieves instance by its ID
 * @param {string} org - organization
 * @param {string} domain - domain
 * @param {string} schema - schema
 * @param {ver} ver - version of schema
 * @param {id} id - ID of instance
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function getInstance(org, domain, schema, ver, id, options = {}, API_PATH, access_token) {
  const requestOptions = access_token? { headers: { "Authorization": "Bearer "+ access_token } }: {};
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['data', org, domain, schema, ver, id], options);
  return fetch(uri, requestOptions);
}

/**
 * Gets list of organizations
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {boolean} fetchAll - whether to fetch all instances or just 1 page
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function getOrgList(options = {}, API_PATH, fetchAll, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['organizations'], options);
  return fetchWrapper(uri, {}, fetchAll, access_token);
}

/**
 * Gets list of domains for particular organization
 * @param {string} org - organization
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {boolean} fetchAll - whether to fetch all instances or just 1 page
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function getDomainsList(org, options = {}, API_PATH, fetchAll, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['domains', org], options);
  return fetchWrapper(uri, {}, fetchAll, access_token);
}

/**
 * Creates instance
 * @param {string} org - organization
 * @param {string} domain - domain
 * @param {string} schema - schema
 * @param {strict} ver - schema version
 * @param {Object} instance - instance
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function addInstance(org, domain, schema, ver, instance, options = {}, API_PATH, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['data', org, domain, schema, ver], options);
  const requestOptions = access_token?
    { method: 'POST', body: instance, headers: {"Authorization": "Bearer "+access_token} }:
    { method: 'POST', body: instance };
  return fetch(uri, requestOptions);
}

/**
 * Downloads an attachment for particular instance
 * @param {string} org - organization
 * @param {string} domain - domain
 * @param {string} schema - schema
 * @param {string} ver - schema version
 * @param {string} id - id of instance
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function downloadAttachment(org, domain, schema, ver, id, options = {}, API_PATH, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['data', org, domain, schema, ver, id, 'attachment'], options);
  const requestOptions = access_token? { headers: {"Authorization": "Bearer "+access_token } }:{};
  return fetch(uri, requestOptions);
}

/**
 * Checks if custom path to API has been added
 * @param {string} API_PATH
 * @returns {string}
 */
function checkPath(API_PATH) {
  if (API_PATH === undefined) {
    return BASE_PATH;
  }
  return API_PATH;
}

/**
 * Returns URL from parts
 * @param {string} base - base path of API
 * @param {Array<string>} parts - array containing URI parts
 * @param {Object} options - Object containing URL params
 * @returns {string}
 */
function buildURI(base, uriParts, options={}) {
  const uri = uriParts
  .filter(uriPart => uriPart !== undefined)
  .reduce((prev, current) => {
    return `${prev}/${current}`;
  }, base);
  const params = Object.keys(options);
  if (params.length === 0) {
    return uri;
  }
  return params.reduce((prev, current, index) => {
    if (index > 0) {
      return `${prev}&${current}=${options[current]}`;
    } else {
      return `${prev}${current}=${options[current]}`;
    }
  }, uri + '?');
}

function getUserInfo(API_PATH, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['oauth2', 'userinfo']);
  const requestOptions = access_token? { headers: { "Authorization": "Bearer "+ access_token } }: {};
  return fetch(uri, requestOptions)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Error occured while fetching ${url}`);
  })
  .catch(err => {
    console.error(err);
  });
}

module.exports = { getSchemasList, searchInstance, getInstancesList, getInstance, getOrgList, getDomainsList, addInstance, downloadAttachment, getUserInfo };
