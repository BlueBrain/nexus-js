export type Filters = {
  brainRegion?: string,
  [filterKey: string]: string,
};

/**
 *
 *
 * @param {{ brainRegion?: string }} Filters
 */
const emodelDataQuery = filters => `
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel ?brainRegionLabel ?description ?strainLabel ?project ?createdAt
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel ?brainRegionLabel ?description ?strainLabel ?project ?createdAt{
        Graph ?g {
            ?s rdf:type nxs:EModelCollection
        }
        ${
          filters && filters.brainRegion
            ? `Graph ?g {
            ?s nxs:brainLocation / nxs:brainRegion <${filters.brainRegion}>
          }`
            : ''
        }
        Graph ?g {
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdfs:label ?speciesLabel }
          OPTIONAL { ?s nxs:brainLocation / nxs:brainRegion / rdfs:label ?brainRegionLabel }
		  OPTIONAL { ?s schema:description ?description  }
          OPTIONAL { ?s nxs:strain / rdfs:label ?strainLabel }
          OPTIONAL { ?s nxv:project ?project }
          OPTIONAL { ?s nxv:createdAt ?createdAt }
        }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT 20
           OFFSET 0
        }
     }
`;

/**
 *
 *
 * @param {{ brainRegion?: string }} Filters
 */
const morphologyDataQuery = filters => `
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>
prefix prov: <http://www.w3.org/ns/prov#>

SELECT ?total ?self ?name ?speciesLabel ?brainRegionLabel ?description ?strainLabel ?project ?createdAt ?age
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel ?brainRegionLabel ?description ?strainLabel ?project ?age ?createdAt{
        Graph ?g {
            ?s rdf:type nxs:ReconstructedNeuronMorphologyCollection
        }
        ${
          filters && filters.brainRegion
            ? `Graph ?g {
            ?s nxs:brainLocation / nxs:brainRegion <${filters.brainRegion}>
          }`
            : ''
        }
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:brainLocation / nxs:brainRegion / rdfs:label ?brainRegionLabel }
		  OPTIONAL { ?s schema:description ?description  }
          OPTIONAL { ?s prov:wasDerivedFrom / nxs:species / rdfs:label ?speciesLabel }
          OPTIONAL { ?s prov:wasDerivedFrom / nxs:strain / rdfs:label ?strainLabel }
          OPTIONAL { ?s prov:wasDerivedFrom / nxs:age / schema:value ?age }
          OPTIONAL { ?s nxv:project ?project }
          OPTIONAL { ?s nxv:createdAt ?createdAt }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT 20
           OFFSET 0
        }
     }
`;

/**
 *
 *
 * @param {{ brainRegion?: string }} Filters
 */
const circuitsDataQuery = filters => `
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel ?brainRegionLabel ?description ?strainLabel ?project ?createdAt
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel ?brainRegionLabel ?description ?strainLabel ?project ?createdAt{
        Graph ?g {
            ?s rdf:type nxs:detailedcircuit
        }
        ${
          filters && filters.brainRegion
            ? `Graph ?g {
            ?s nxs:brainLocation / nxs:brainRegion <${filters.brainRegion}>
          }`
            : ''
        }
        Graph ?g {
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdfs:label ?speciesLabel }
          OPTIONAL { ?s nxs:brainLocation / nxs:brainRegion / rdfs:label ?brainRegionLabel }
		      OPTIONAL { ?s schema:description ?description  }
          OPTIONAL { ?s nxs:strain / rdfs:label ?strainLabel }
          OPTIONAL { ?s nxv:project ?project }
          OPTIONAL { ?s nxv:createdAt ?createdAt }
        }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT 20
           OFFSET 0
        }
     }
`;

/**
 *
 *
 * @param {{ brainRegion?: string }} Filters
 */
const simulationsDataQuery = filters => `
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel ?brainRegionLabel ?description ?strainLabel ?project ?createdAt
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel ?brainRegionLabel ?description ?strainLabel ?project ?createdAt{
        Graph ?g {
            ?s rdf:type nxs:simulation_campaign
        }
        ${
          filters && filters.brainRegion
            ? `Graph ?g {
            ?s nxs:brainLocation / nxs:brainRegion <${filters.brainRegion}>
          }`
            : ''
        }
        Graph ?g {
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdfs:label ?speciesLabel }
          OPTIONAL { ?s nxs:brainLocation / nxs:brainRegion / rdfs:label ?brainRegionLabel }
		      OPTIONAL { ?s schema:description ?description  }
          OPTIONAL { ?s nxs:strain / rdfs:label ?strainLabel }
          OPTIONAL { ?s nxv:project ?project }
          OPTIONAL { ?s nxv:createdAt ?createdAt }
        }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT 20
           OFFSET 0
        }
     }
`;

/**
 *
 *
 * @param {{ brainRegion?: string }} Filters
 */
const modelCellCollectionsDataQuery = filters => `
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel ?brainRegionLabel ?description ?strainLabel ?project ?createdAt
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel ?brainRegionLabel ?description ?strainLabel ?project ?createdAt{
        Graph ?g {
            ?s rdf:type nxs:ModelCellCollection
        }
        ${
          filters && filters.brainRegion
            ? `Graph ?g {
            ?s nxs:brainLocation / nxs:brainRegion <${filters.brainRegion}>
          }`
            : ''
        }
        Graph ?g {
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdfs:label ?speciesLabel }
          OPTIONAL { ?s nxs:brainLocation / nxs:brainRegion / rdfs:label ?brainRegionLabel }
		      OPTIONAL { ?s schema:description ?description  }
          OPTIONAL { ?s nxs:strain / rdfs:label ?strainLabel }
          OPTIONAL { ?s nxv:project ?project }
          OPTIONAL { ?s nxv:createdAt ?createdAt }
        }
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?self) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?self
           LIMIT 20
           OFFSET 0
        }
     }
`;

/**
 *
 * @param {string[]} workspaceIds
 */
const generateStudioResource = workspaceIds => ({
  '@context': 'https://bluebrainnexus.io/studio/context',
  label: 'BBP Studio',
  '@type': 'Studio',
  workspaces: workspaceIds.map(id => ({ '@id': id })),
});

/**
 *
 * @param {string} label
 * @param {[string, string][]} dashboardViewIdPairs
 */
const generateWorkspaceResource = (label, dashboardViewIdPairs) => ({
  '@context': 'https://bluebrainnexus.io/studio/context',
  '@type': 'StudioWorkspace',
  label: label,
  dashboards: dashboardViewIdPairs.map(pair => ({
    dashboard: { '@id': pair[0] },
    view: { '@id': pair[1] },
  })),
});

/**
 * TODO: add view ID as param if needed
 *
 * @param {[string, string][]} projectViewIdPairs
 */
const generateStudioView = projectViewIdPairs => ({
  '@id': 'nxv:StudioSparqlView',
  '@type': 'AggregateSparqlView',
  views: projectViewIdPairs.map(pair => ({
    project: pair[0],
    viewId: pair[1],
  })),
});

const studioContext = {
  '@context': [
    {
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
    },
  ],
  '@id': 'https://bluebrainnexus.io/studio/context',
};

/**
 *
 *
 * @param {{ brainRegion?: string }} Filters
 */
const emodelsCollectionDashboard = filters => ({
  '@context': 'https://bluebrainnexus.io/studio/context',
  '@type': 'StudioDashboard',
  label: 'E-models Dashboard',
  description: 'e-models curation',
  dataQuery: emodelDataQuery(filters),
});

/**
 *
 *
 * @param {{ brainRegion?: string }} Filters
 */
const morphologyCollectionDashboard = filters => ({
  '@context': 'https://bluebrainnexus.io/studio/context',
  '@type': 'StudioDashboard',
  label: 'Morphology Dashboard',
  description: 'Morphology curation',
  dataQuery: morphologyDataQuery(filters),
});

/**
 *
 *
 * @param {{ brainRegion?: string }} Filters
 */
const circuitsDashboard = filters => ({
  '@context': 'https://bluebrainnexus.io/studio/context',
  '@type': 'StudioDashboard',
  label: 'Circuits Dashboard',
  description: 'Circuits curation',
  dataQuery: circuitsDataQuery(filters),
});

/**
 *
 *
 * @param {{ brainRegion?: string }} Filters
 */
const simulationsCampaignDashboard = filters => ({
  '@context': 'https://bluebrainnexus.io/studio/context',
  '@type': 'StudioDashboard',
  label: 'Simulation Campaigns Dashboard',
  description: 'Collections of simulations rolled into a campaign',
  dataQuery: simulationsDataQuery(filters),
});

/**
 *
 *
 * @param {{ brainRegion?: string }} Filters
 */
const modelCellCollectionDashboard = filters => ({
  '@context': 'https://bluebrainnexus.io/studio/context',
  '@type': 'StudioDashboard',
  label: 'ME-Model Curation Dashboard',
  description: 'ME model cell collections',
  dataQuery: modelCellCollectionsDataQuery(filters),
});

module.exports = {
  generateStudioResource,
  generateWorkspaceResource,
  generateStudioView,
  studioContext,
  emodelsCollectionDashboard,
  morphologyCollectionDashboard,
  circuitsDashboard,
  simulationsCampaignDashboard,
  modelCellCollectionDashboard,
};
