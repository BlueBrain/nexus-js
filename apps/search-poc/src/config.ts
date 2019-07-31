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
