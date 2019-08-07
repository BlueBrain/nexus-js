export const SETTINGS = {
  preferredRealmKey: 'preferredRealm',
  bearerTokenKey: 'nexusToken',
  serviceAccountName: 'serviceaccounts',
  clientId: 'nexus-web',
  redirectUrl: window.location.origin,
  environment: 'https://staging.nexus.ocp.bbp.epfl.ch/v1',
  sparqlFilterQuery: {
    orgLabel: 'bbp',
    projectLabel: 'nmc',
    viewID: 'nxv:defaultSparqlIndex',
    query: `    prefix nxs: <https://neuroshapes.org/>
    prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
    prefix prov: <http://www.w3.org/ns/prov#>
    prefix schema: <http://schema.org/>
    prefix nshapes: <https://neuroshapes.org/dash/>
  
    SELECT DISTINCT ?typeID ?speciesLabel ?speciesID  ?brainRegionID ?brainRegionLabel ?projectID ?strainID ?strainLabel ?mTypeLabel ?agentID
    {
      { 
        ?s nxs:contribution / prov:agent ?agentID
      } UNION {
        ?s nxs:annotation / nxs:hasBody ?noteBody .
         ?noteBody <http://www.w3.org/2000/01/rdf-schema#label> ?mTypeLabel
      } UNION {
        ?s nxs:brainLocation / nxs:brainRegion ?brainRegionID .
        # ?s nxv:constrainedBy nshapes:dataset .
        OPTIONAL { ?brainRegionID nxs:label ?brainRegionLabel }
      } UNION {
        ?s nxs:species ?speciesID .
        # ?s nxv:constrainedBy nshapes:dataset .
        OPTIONAL { ?speciesID nxs:label ?speciesLabel }
      } UNION {
        ?s nxs:strain ?strainID .
        # ?s nxv:constrainedBy nshapes:dataset .
        OPTIONAL { ?strainID nxs:label ?strainLabel }
      } UNION {
        ?s nxv:project ?projectID .
      } UNION {
        ?s rdf:type ?typeID .
        FILTER(STRSTARTS(STR(?typeID), "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/"))
        # ?s nxv:constrainedBy nshapes:dataset .
      }
    }`,
  },
  sparqlDatasetQueryConfig: {
    vocab: `
        prefix nxs: <https://neuroshapes.org/>
        prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
      `,
    graphs: {
      brainRegion: `Graph ?g {
        VALUES ?brainRegions { #{values} }
        ?s nxs:brainLocation / nxs:brainRegion ?brainRegions .
      }`,
      type: `Graph ?g {
        VALUES ?types { #{values} }
        ?s rdf:type ?types .
      }`,
      mTypeLabel: `
      Graph ?g {
        VALUES ?mTypes { #{labels} }
          ?s nxs:annotation / nxs:hasBody / <http://www.w3.org/2000/01/rdf-schema#label> ?mTypes
      }`,
    },
  },
};

export const emodelDataQuery = `
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>  

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
          OPTIONAL { ?s nxs:name ?name .
          ?s nxs:species / nxs:label ?speciesLabel }
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

export const morphologyDataQuery = `
prefix nxs: <https://neuroshapes.org/>
prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>  

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
          OPTIONAL { ?s nxs:name ?name .
          ?s nxs:species / nxs:label ?speciesLabel }
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
     }`;

// {
//   "@context": {},
//   "@id": "",
//   "@type": "AggregateSparqlView",
//   "views": [
//     {
//       "project": "pgetta-data/proj1",
//       "viewId": "nxv:defaultSparqlIndex"
//     },
//         {
//       "project": "pgetta-data/proj32",
//       "viewId": "nxv:defaultSparqlIndex"
//     },
//         {
//       "project": "pgetta-data/proj38",
//       "viewId": "nxv:defaultSparqlIndex"
//     },
//         {
//       "project": "pgetta-data/proj42",
//       "viewId": "nxv:defaultSparqlIndex"
//     },
//         {
//       "project": "pgetta-data/proj55",
//       "viewId": "nxv:defaultSparqlIndex"
//     }
//     ,
//         {
//       "project": "pgetta-data/proj59",
//       "viewId": "nxv:defaultSparqlIndex"
//     },
//         {
//       "project": "pgetta-data/proj64",
//       "viewId": "nxv:defaultSparqlIndex"
//     },
//         {
//       "project": "pgetta-data/proj66",
//       "viewId": "nxv:defaultSparqlIndex"
//     },
//         {
//       "project": "pgetta-data/proj68",
//       "viewId": "nxv:defaultSparqlIndex"
//     }
//   ]
// }
