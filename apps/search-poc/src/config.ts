export const PAGE_SIZE = 20;

export const SETTINGS = {
  preferredRealmKey: 'preferredRealm',
  bearerTokenKey: 'nexusToken',
  serviceAccountName: 'serviceaccounts',
  clientId: 'bbp-workflow-web',
  redirectUrl: window.location.origin,
  environment: 'https://bbp.epfl.ch/nexus/v1',
  studioOrg: 'nse',
  studioProject: 'test',
  studioViewId: 'nxv:defaultSparqlIndex',
  studioId: 'https://bluebrainnexus.io/studio/bbp-studio',
};

export const MORPH_CONVERTER_URL =
  'http://morph-service.ocp.bbp.epfl.ch/converter/api';

export function getCollectionEModelsQuery(resourceId: string) {
  return `
    prefix nxs: <https://neuroshapes.org/>
    prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
    prefix schema: <http://schema.org/>
    prefix nexus: <https://bluebrain.github.io/nexus/vocabulary/>
    prefix prov: <http://www.w3.org/ns/prov#>
    SELECT DISTINCT ?name ?brainRegionLabel ?self ?project ?createdAt WHERE {
      <${resourceId}> nxs:emodels ?emodel .
      ?emodel schema:name ?name .
      ?emodel nexus:self ?self .
      optional {?emodel schema:description  ?description}
      OPTIONAL { ?s schema:name ?name }
      OPTIONAL { ?emodel nxs:brainLocation / nxs:brainRegion / rdfs:label ?brainRegionLabel }
      OPTIONAL { ?emodel schema:description ?description  }
      OPTIONAL { ?emodel nxs:subject / nxs:species / rdfs:label ?speciesLabel }
      OPTIONAL { ?emodel nxs:subject / nxs:strain / rdfs:label ?strainLabel }
      #OPTIONAL { ?emodel nxs:subject / nxs:age / schema:value ?age }
      OPTIONAL { ?emodel nxv:project ?project }
      OPTIONAL { ?emodel nxv:createdAt ?createdAt }
    }`;
}

export function getCollectionReconstructedCellsQuery(resourceId: string) {
  return `prefix nxs: <https://neuroshapes.org/>
  prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
  prefix schema: <http://schema.org/>
  prefix nexus: <https://bluebrain.github.io/nexus/vocabulary/>
  prefix prov: <http://www.w3.org/ns/prov#>
  SELECT DISTINCT ?name ?brainRegionLabel ?self ?project ?createdAt WHERE {
    <${resourceId}> nxs:reconstructedcells ?reconstructedcells .
    ?reconstructedcells nexus:self ?self .
    ?reconstructedcells schema:name ?name .
    optional {?reconstructedcells schema:description  ?description}
    OPTIONAL { ?s schema:name ?name }
    OPTIONAL { ?reconstructedcells nxs:brainLocation / nxs:brainRegion / rdfs:label ?brainRegionLabel }
    OPTIONAL { ?reconstructedcells schema:description ?description  }
    OPTIONAL { ?reconstructedcells nxs:subject / nxs:species / rdfs:label ?speciesLabel }
    OPTIONAL { ?reconstructedcells nxs:subject / nxs:strain / rdfs:label ?strainLabel }
    #OPTIONAL { ?reconstructedcells nxs:subject / nxs:age / schema:value ?age }
    OPTIONAL { ?reconstructedcells nxv:project ?project }
    OPTIONAL { ?reconstructedcells nxv:createdAt ?createdAt }
  }`;
}

export function getSimulationCampaignSimulationsQuery(resourceId: string) {
  return `prefix nxs: <https://neuroshapes.org/>
  prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
  prefix schema: <http://schema.org/>
  prefix nexus: <https://bluebrain.github.io/nexus/vocabulary/>
  prefix prov: <http://www.w3.org/ns/prov#>
  SELECT DISTINCT ?simulation ?name ?self ?startedAtTime ?endedAtTime ?status ?job_id ?path
  WHERE {
    ?simulation prov:wasStartedBy <${resourceId}> .
    ?simulation nexus:self ?self .
    ?simulation schema:name ?name .
    OPTIONAL { ?simulation nxv:project ?project }
    OPTIONAL { ?simulation nxs:status ?status }
    OPTIONAL { ?simulation nxs:job_id ?job_id }
    OPTIONAL { ?simulation prov:startedAtTime ?startedAtTime }
    OPTIONAL { ?simulation prov:endedAtTime ?endedAtTime }
  }
  `;
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
