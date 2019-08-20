export const SETTINGS = {
  preferredRealmKey: 'preferredRealm',
  bearerTokenKey: 'nexusToken',
  serviceAccountName: 'serviceaccounts',
  clientId: 'nexus-web',
  redirectUrl: window.location.origin,
  environment: 'https://staging.nexus.ocp.bbp.epfl.ch/v1',
  studioOrg: 'bbp_test',
  studioProject: 'studio',
  studioViewId: 'nxv:defaultSparqlIndex',
  studioId:
    'https://staging.nexus.ocp.bbp.epfl.ch/v1/resources/bbp_test/studio/_/3cb3997c-2a3b-4160-bccb-00de904aa566',
};

export const MORPH_CONVERTER_URL =
  'http://morph-service.ocp.bbp.epfl.ch/converter/api';

export function getCollectionEModelsQuery(resourceId: string) {
  return `
    prefix nxv: <https://neuroshapes.org/>
    prefix schema: <http://schema.org/>
    prefix nexus: <https://bluebrain.github.io/nexus/vocabulary/>
    SELECT * WHERE {
      <${resourceId}> nxv:emodels ?emodel .
      ?emodel schema:name ?name .
      ?emodel nexus:self ?self .
      optional {?emodel schema:description  ?description}
    } LIMIT 100`;
}

export function getCollectionReconstructedCellsQuery(resourceId: string) {
  return `
  prefix nxv: <https://neuroshapes.org/>
  prefix schema: <http://schema.org/>
  prefix nexus: <https://bluebrain.github.io/nexus/vocabulary/>
  SELECT * WHERE {
    <${resourceId}> nxv:reconstructedcells ?reconstructedcell .
    ?reconstructedcell schema:name ?name .
    ?reconstructedcell nexus:self ?self .
    optional {?reconstructedcell schema:description  ?description}
  } LIMIT 20`;
}

export const getStudioConfig = (studioId: string) => `
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix studio: <https://bluebrainnexus.io/studio/vocabulary/>
prefix schema: <http://schema.org/>

CONSTRUCT {  
	<${studioId}> rdfs:label ?studioLabel ;
                studio:workspaces ?workspaceId .
    ?workspaceId rdfs:label ?workspaceLabel ;
                 schema:description ?workspaceDescription ;
  	             studio:dashboards ?dashboards .
    ?dashboards studio:view ?viewId ;
                studio:dashboard ?dashboardId .
    ?dashboardId rdfs:label ?dashboardLabel ;
                 studio:dataQuery ?dashboardQuery ;
                 schema:description ?dashboardDescription .
    ?viewId studio:project ?viewProject
} WHERE {
  <${studioId}>   rdfs:label ?studioLabel ;
                  studio:workspaces ?workspaceId .
  ?workspaceId  rdfs:label ?workspaceLabel ;
                studio:dashboards ?dashboards .
  ?dashboards studio:dashboard ?dashboardId ;
              studio:view ?viewId .
  ?dashboardId rdfs:label ?dashboardLabel ;
               studio:dataQuery ?dashboardQuery .
  ?viewId nxv:project ?viewProject .
  OPTIONAL { ?workspaceId schema:description ?workspaceDescription } .
  OPTIONAL { ?dashboardId schema:description ?dashboardDescription } .
}`;

export const studioContext = {
  '@base': 'https://bluebrainnexus.io/studio/',
  '@vocab': 'https://bluebrainnexus.io/studio/vocabulary/',
  label: {
    '@id': 'http://www.w3.org/2000/01/rdf-schema#label',
  },
  name: {
    '@id': 'http://schema.org/name',
  },
  description: {
    '@id': 'http://schema.org/description',
  },
  workspaces: {
    '@id': 'https://bluebrainnexus.io/studio/vocabulary/workspaces',
    '@container': '@set',
    '@type': '@id',
  },
  dashboards: { '@container': '@set' },
  dashboard: {
    '@id': 'https://bluebrainnexus.io/studio/vocabulary/dashboard',
    '@type': '@id',
  },
  view: {
    '@id': 'https://bluebrainnexus.io/studio/vocabulary/view',
    '@type': '@id',
  },
};

export const studioFrame = {
  '@id': SETTINGS.studioId,
  '@context': studioContext,
};
