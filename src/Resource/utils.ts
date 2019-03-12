import { PaginatedList, Project } from '..';
import Resource, { DEFAULT_GET_RESOURCE_OPTIONS } from '.';
import {
  httpGet,
  httpPut,
  httpPost,
  httpDelete,
  HttpConfigTypes,
} from '../utils/http';
import {
  CreateResourcePayload,
  ResourceListTagResponse,
  ListResourceOptions,
  ResourceResponse,
  ListResourceResponse,
  ResourceResponseCommon,
  Context,
  ResourceGetFormat,
  ResourceGetFormats,
  GetResourceOptions,
  ResourceLink,
} from './types';
import { buildQueryParams } from '../utils';
import { PaginationSettings } from '../utils/types';
import { SparqlViewQueryResponse } from '../View/SparqlView/types';
import { getSparqlView } from '../View/utils';

// Fetch a resource as raw data for any number of
// content negotiation formats,
// e.g. JSON-LD, nTriples, and DOT
export async function getSelfResourceRawAs(
  selfUrl: string,
  format: ResourceGetFormats = ResourceGetFormat.JSON_LD,
): Promise<any> {
  try {
    return await httpGet(selfUrl, {
      useBase: false,
      extraHeaders: {
        Accept: format,
      },
      receiveAs:
        format === ResourceGetFormat.JSON_LD
          ? HttpConfigTypes.JSON
          : HttpConfigTypes.TEXT,
    });
  } catch (error) {
    throw error;
  }
}

export async function getSelfResource(
  selfUrl: string,
  getResourceOptions: GetResourceOptions = DEFAULT_GET_RESOURCE_OPTIONS,
): Promise<Resource> {
  try {
    const [id, schema, projectLabel, orgLabel, ...rest] = selfUrl
      .split('/')
      .reverse();
    const url = `${selfUrl}${
      getResourceOptions.expanded ? '?format=expanded' : ''
    }`;
    const resourceResponse: ResourceResponse = await getSelfResourceRawAs(url);
    const resource = new Resource(
      orgLabel,
      projectLabel,
      resourceResponse,
      getResourceOptions,
    );
    return resource;
  } catch (error) {
    throw error;
  }
}

export async function getResource(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  resourceId: string,
  getResourceOptions: GetResourceOptions = DEFAULT_GET_RESOURCE_OPTIONS,
): Promise<Resource> {
  const projectResourceURL = `/resources/${orgLabel}/${projectLabel}/${schemaId}/${resourceId}${
    getResourceOptions.expanded ? '?format=expanded' : ''
  }`;
  try {
    const resourceResponse: ResourceResponse = await httpGet(
      projectResourceURL,
    );
    const resource = new Resource(
      orgLabel,
      projectLabel,
      resourceResponse,
      getResourceOptions,
    );
    return resource;
  } catch (error) {
    throw error;
  }
}

export async function listResources(
  orgLabel: string,
  projectLabel: string,
  options?: ListResourceOptions,
): Promise<PaginatedList<Resource>> {
  try {
    const opts = buildQueryParams(options);
    const listResourceResponses: ListResourceResponse = await httpGet(
      `/resources/${orgLabel}/${projectLabel}${opts}`,
    );
    const total: number = listResourceResponses._total;
    const index: number = (options && options.from) || 1;
    const results: Resource[] = listResourceResponses._results.map(
      (commonResponse: ResourceResponseCommon) =>
        new Resource(orgLabel, projectLabel, {
          ...commonResponse,
          '@context': listResourceResponses['@context'],
        }),
    );

    return {
      total,
      index,
      results,
    };
  } catch (error) {
    throw error;
  }
}

export async function createResource(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  payload: CreateResourcePayload,
): Promise<Resource> {
  try {
    let resource: Resource;
    // if no resourceID provided, we post the new resource (Nexus will create the ID for us)
    if (!payload.resourceId) {
      const { context, type, ...rest } = payload;
      const resourceResponse: ResourceResponse = await httpPost(
        `/resources/${orgLabel}/${projectLabel}/${schemaId}`,
        {
          '@context': context,
          '@type': type,
          ...rest,
        },
      );
      resource = new Resource(orgLabel, projectLabel, resourceResponse);
    } else {
      const { context, type, resourceId, ...rest } = payload;
      const resourceResponse: ResourceResponse = await httpPut(
        `/resources/${orgLabel}/${projectLabel}/${schemaId}/${encodeURIComponent(
          resourceId,
        )}`,
        {
          '@context': context,
          '@type': type,
          ...rest,
        },
      );
      resource = new Resource(orgLabel, projectLabel, resourceResponse);
    }

    return resource;
  } catch (error) {
    throw error;
  }
}

export async function updateSelfResource(
  selfUrl: string,
  rev: number,
  {
    context,
    ...data
  }: {
    context?: Context;
    [field: string]: any;
  },
  orgLabel: string,
  projectLabel: string,
): Promise<Resource> {
  try {
    const resourceResponse: ResourceResponse = await httpPut(
      `${selfUrl}?rev=${rev}`,
      {
        '@context': context,
        ...data,
      },
    );
    return new Resource(orgLabel, projectLabel, resourceResponse);
  } catch (error) {
    throw error;
  }
}

export async function updateResource(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  resourceId: string,
  rev: number,
  {
    context,
    ...data
  }: {
    context?: Context;
    [field: string]: any;
  },
): Promise<Resource> {
  const projectResourceURL = `/resources/${orgLabel}/${projectLabel}/${schemaId}/${resourceId}`;
  try {
    const resourceResponse: ResourceResponse = await httpPut(
      `${projectResourceURL}?rev=${rev}`,
      {
        '@context': context,
        ...data,
      },
    );
    return new Resource(orgLabel, projectLabel, resourceResponse);
  } catch (error) {
    throw error;
  }
}

export async function tagResource(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  resourceId: string,
  rev: number,
  {
    tagName,
    tagFromRev,
  }: {
    tagName: string;
    tagFromRev: number;
  },
): Promise<Resource> {
  try {
    const resourceResponse: ResourceResponse = await httpPost(
      `/resources/${orgLabel}/${projectLabel}/${schemaId}/${resourceId}/tags?rev=${rev}`,
      {
        tag: tagName,
        rev: tagFromRev,
      },
    );
    return new Resource(orgLabel, projectLabel, resourceResponse);
  } catch (error) {
    throw error;
  }
}

export async function tagSelfResource(
  selfUrl: string,
  rev: number,
  {
    tagName,
    tagFromRev,
  }: {
    tagName: string;
    tagFromRev: number;
  },
  orgLabel: string,
  projectLabel: string,
): Promise<Resource> {
  try {
    const resourceResponse: ResourceResponse = await httpPost(
      `${selfUrl}/tags?rev=${rev}`,
      {
        tag: tagName,
        rev: tagFromRev,
      },
      { useBase: false },
    );
    return new Resource(orgLabel, projectLabel, resourceResponse);
  } catch (error) {
    throw error;
  }
}

export async function listTags(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  resourceId: string,
): Promise<string[]> {
  try {
    const response: ResourceListTagResponse = await httpGet(
      `/resources/${orgLabel}/${projectLabel}/${schemaId}/${resourceId}/tags`,
    );
    return response.tags;
  } catch (error) {
    throw error;
  }
}

export async function listSelfTags(selfUrl: string): Promise<string[]> {
  try {
    const response: ResourceListTagResponse = await httpGet(`${selfUrl}/tags`, {
      useBase: false,
    });
    return response.tags;
  } catch (error) {
    throw error;
  }
}

export async function deprecateResource(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  resourceId: string,
  rev: number,
): Promise<Resource> {
  try {
    const resourceResponse: ResourceResponse = await httpDelete(
      `/resources/${orgLabel}/${projectLabel}/${schemaId}/${resourceId}?rev=${rev}`,
    );
    return new Resource(orgLabel, projectLabel, resourceResponse);
  } catch (error) {
    throw error;
  }
}

export async function deprecateSelfResource(
  selfUrl: string,
  rev: number,
  orgLabel: string,
  projectLabel: string,
): Promise<Resource> {
  try {
    const resourceResponse: ResourceResponse = await httpDelete(
      `${selfUrl}?rev=${rev}`,
      { useBase: false },
    );
    return new Resource(orgLabel, projectLabel, resourceResponse);
  } catch (error) {
    throw error;
  }
}

export async function getOutgoingLinks(
  orgLabel: string,
  projectLabel: string,
  selfUrl: string,
  paginationSettings: PaginationSettings,
): Promise<PaginatedList<ResourceLink>> {
  return await getLinks(
    orgLabel,
    projectLabel,
    paginationSettings,
    () => `
  prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
  SELECT ?total ?o ?p ?self

  WITH {
    SELECT DISTINCT ?p ?o ?self
        WHERE {
            graph ?g1 {
              <${selfUrl}> ?p ?o
              FILTER(isIri(?o) && ?p NOT IN (nxv:updatedBy, nxv:createdBy, nxv:constrainedBy, nxv:project, rdf:type))
            } .
            OPTIONAL {
              graph ?g2 {
              	?o nxv:constrainedBy ?aSchema .
                ?o nxv:self ?self
              }
            }
      }
} AS %resultSet


  WHERE {
     {
        SELECT (COUNT(?o) AS ?total)
        WHERE { INCLUDE %resultSet }
     }
     UNION
    {
        SELECT *
        WHERE { INCLUDE %resultSet }
        ORDER BY ?o ?p
        LIMIT ${paginationSettings.size}
        OFFSET ${paginationSettings.from}
     }
  }
  `,
  );
}

export async function getIncomingLinks(
  orgLabel: string,
  projectLabel: string,
  selfUrl: string,
  paginationSettings: PaginationSettings,
): Promise<PaginatedList<ResourceLink>> {
  return await getLinks(
    orgLabel,
    projectLabel,
    paginationSettings,
    () => `
    prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>

    SELECT ?total ?s ?p  ?self

    WITH {
      SELECT DISTINCT ?s ?p ?self
      WHERE {
        graph ?g1 {

          ?ref ?p <${selfUrl}> .
          ?s nxv:constrainedBy ?aSchema .
          ?s nxv:self ?self

        }
      }
    } AS %resultSet

    WHERE {
      {
        SELECT (COUNT(?s) AS ?total)
        WHERE { INCLUDE %resultSet }
      }
      UNION
      {
        SELECT *
        WHERE { INCLUDE %resultSet }
        ORDER BY ?s ?p
        LIMIT ${paginationSettings.size}
        OFFSET ${paginationSettings.from}
       }
      }
    `,
  );
}

export async function getLinks(
  orgLabel: string,
  projectLabel: string,
  paginationSettings: PaginationSettings,
  makeQuery: () => string,
): Promise<PaginatedList<ResourceLink>> {
  try {
    const { from } = paginationSettings;
    const view = await getSparqlView(orgLabel, projectLabel);
    const query = makeQuery();
    const paginatedResponse: SparqlViewQueryResponse = await view.query(query);
    if (paginatedResponse.results) {
      const totalBinding =
        paginatedResponse.results &&
        paginatedResponse.results.bindings.find(binding => !!binding.total);
      const queryResults = paginatedResponse.results.bindings.filter(
        binding => typeof binding['total'] === 'undefined',
      );

      const resourcePromises = queryResults.map(subjectPredicate => {
        // depending on incoming or outgoing, we'll center on subject or object
        const graphID = (subjectPredicate.s || subjectPredicate.o).value;

        // self exists here, so we can assume that
        // it is a resource in the platform
        if (!!subjectPredicate.self) {
          return Resource.getSelf(subjectPredicate.self.value);
        }

        // otherwise it is not a resource, likely DOI or URI
        return graphID;
      });
      const resources = await Promise.all(resourcePromises);
      return {
        total: totalBinding ? totalBinding.total.value : 0,
        index: from,
        results: queryResults.map((subjectPredicate, index) => {
          return {
            link: resources[index],
            isExternal: !subjectPredicate.self,
            predicate: subjectPredicate.p.value,
          };
        }),
      };
    }
    return {
      total: 0,
      index: from,
      results: [],
    };
  } catch (error) {
    throw error;
  }
}
