import FileSaver from 'file-saver';
import streamSaver from 'StreamSaver';
import queryString from 'query-string';

const BASE_PATH = 'https://bbp-nexus.epfl.ch/v0';
/**
 * retrieve schemas listing optionally for particular org and domain
 * @param {string} org - name of organization
 * @param {Array} parts - array containg child entity names for building request
 * @param {string} API_PATH - custom URI for Nexus instance
 * @param {boolean} fetchAll - whether to fetch all instances or just 1 page
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function getSchemasList(parts = [], options = {}, API_PATH, fetchAll, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['schemas', ...parts], options);
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
 * @param {number} from - begninng point for pagination
 * @param {number} size - size of results for pagination
 * @returns {Promise<Object>}
 */
function searchInstance(query, org, domain, API_PATH, fetchAll, access_token, from, size) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['data'], { q: query, from: from, size: size });
  return fetchWrapper(uri, {}, fetchAll, access_token);
}

/**
 * Retrievs instances by its schema version
 * @param {Array} parts - array containg child entity names for building request
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {boolean} fetchAll - whether to fetch all instances or just 1 page
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function getInstancesList(parts = [], options = {}, API_PATH, fetchAll, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['data', ...parts], options);
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
  return fetchWithToken(url, access_token)
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
  });
}

/**
 * Add Authorization header to fetch request.
 * @param {string} uri - actual url for request
 * @param {string} access_token - access_token recieved via OAuth
 */
function fetchWithToken(uri, access_token) {
  const requestOptions = access_token? { headers: { "Authorization": "Bearer "+ access_token } }: {};
  return fetch(uri, requestOptions);
}

/**
 * Retrieves instance by its ID
 * @param {Array} parts - array containg child entity names for building request
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function getInstance(parts, options = {}, API_PATH, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['data', ...parts], options);
  return fetchWithToken(uri, access_token);
}

/**
 * Gets list of organizations
 * @param {Array} parts - array containg child entity names for building request(here will be [])
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {boolean} fetchAll - whether to fetch all instances or just 1 page
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function getOrgList(parts = [], options = {}, API_PATH, fetchAll, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['organizations', ...parts], options);
  return fetchWrapper(uri, {}, fetchAll, access_token);
}

/**
 * Gets list of domains for particular organization
 * @param {Array} parts - array containg child entity names for building request
 * @param {object} options - querystring contained in an object form
 * @param {string} API_PATH - custom path for API
 * @param {boolean} fetchAll - whether to fetch all instances or just 1 page
 * @param {string} access_token - access_token recieved via OAuth
 * @returns {Promise<Object>}
 */
function getDomainsList(parts, options = {}, API_PATH, fetchAll, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['domains', ...parts], options);
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
 * @param {string} access_token - access_token received via OAuth
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
 * Trigger the download of an attachment
 * @param {string} downloadUrl - value of downloadUrl property in the selected attachment of the instance
 * @param {string} fileName - value of originalFileName property in the attachment
 * @param {string} access_token - access_token received via OAuth
 * @returns {void}
 */
function downloadAttachment(downloadUrl, fileName, access_token) {
  return fetchWithToken(downloadUrl, access_token)
    .then(response => {
      if (!response.ok) {
        console.log('Download failed: ', response);
        return;
      }

      //TODO: replace below with one time download link when implemented
      //https://github.com/BlueBrain/nexus-kg/issues/303

      //use streamSaver to download if supported, FileSaver is RAM and blob size limited
      if(streamSaver.supported && typeof response.body.pipeTo === 'function'){
        const fileStream = streamSaver.createWriteStream(fileName);
        response.body.pipeTo(fileStream);
      }else{
        response.blob().then(blob => {
          FileSaver.saveAs(blob, fileName, true);
        });
      }
    });
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
  const params = queryString.stringify(options);
  return `${uri}?${params}`;
}

function getUserInfo(API_PATH, access_token) {
  const path = checkPath(API_PATH);
  const uri = buildURI(path, ['oauth2', 'userinfo']);
  return fetchWithToken(uri, access_token)
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

export { fetchWithToken, getSchemasList, searchInstance, getInstancesList, getInstance, getOrgList, getDomainsList, addInstance, downloadAttachment, getUserInfo };
