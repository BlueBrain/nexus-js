'use strict';
const BASE_PATH = 'https://bbp-nexus.epfl.ch/v0';

function getSchemasList(org, API_PATH) {
  checkPath(API_PATH)
  return fetch(API_PATH+`/schemas/${org}/`);
}

function searchInstance(query, API_PATH) {
  checkPath(API_PATH)
  return fetch(API_PATH+`/data?q=${query}`);
}

function getInstance(org, domain, schema, ver, id, API_PATH) {
  checkPath(API_PATH)
  return fetch(API_PATH+`/data/${org}/${domain}/${schema}/${ver}/${id}`);
}

function login() {

}

function getOrgList(API_PATH) {
  checkPath(API_PATH)
  return fetch(API_PATH+`/organizations`);
}

function getDomainsList(org, API_PATH) {
  checkPath(API_PATH)
  return fetch(API_PATH+`/organizations/${org}/domains`);
}

function addInstance(org, domain, schema, ver, instance, API_PATH) {
  checkPath(API_PATH)
  return fetch(API_PATH+`/data/${org}/${domain}/${schema}/${ver}`, { method: 'POST', body: instance });
}

function downloadAttachment(org, domain, schema, ver, id, API_PATH) {
  checkPath(API_PATH)
  return fetch(API_PATH+`/data/${org}/${domain}/${schema}/${ver}/${id}/attachment`);
}

function checkPath(API_PATH) {
  if (API_PATH === undefined) {
    API_PATH = BASE_PATH;
  }
}

module.exports = { getSchemasList, searchInstance, getInstance, getOrgList, getDomainsList, addInstance, downloadAttachment, login };
