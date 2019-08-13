const emodelDataQuery = `
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel {
        Graph ?g {
            ?s rdf:type nxs:EModelCollection
        }
        Graph ?g {
          ?s nxs:brainLocation / nxs:brainRegion <http://purl.obolibrary.org/obo/UBERON_0004703>
        }
        Graph ?g {
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdf:label ?speciesLabel }
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

const morphologyDataQuery = `
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
prefix schema: <http://schema.org/>

SELECT ?total ?self ?name ?speciesLabel
     WITH {
      SELECT DISTINCT ?self ?name ?speciesLabel {
        Graph ?g {
            ?s rdf:type nxs:ReconstructedNeuronMorphologyCollection
        }
        Graph ?g {
          ?s nxs:brainLocation / nxs:brainRegion <http://purl.obolibrary.org/obo/UBERON_0004703>
        }
        Graph ?g {
          ?s nxv:self ?self    .
          OPTIONAL { ?s schema:name ?name }
          OPTIONAL { ?s nxs:species / rdf:label ?speciesLabel }
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

const emodelsCollectionDashboard = {
  '@context': 'https://bluebrainnexus.io/studio/context',
  '@type': 'StudioDashboard',
  label: 'E-models Dashboard',
  description: 'e-models filter',
  dataQuery: emodelDataQuery,
};

const morphologyCollectionDashboard = {
  '@context': 'https://bluebrainnexus.io/studio/context',
  '@type': 'StudioDashboard',
  label: 'Morphology Dashboard',
  description: 'morpho filter',
  dataQuery: morphologyDataQuery,
};

module.exports = {
  generateStudioResource,
  generateWorkspaceResource,
  generateStudioView,
  studioContext,
  emodelsCollectionDashboard,
  morphologyCollectionDashboard,
};