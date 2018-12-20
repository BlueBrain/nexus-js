import { PaginationSettings, PaginatedList } from '..';
import Resource, { ListResourceResponse, ResourceResponse } from '.';
import { httpGet, httpPut } from '../utils/http';

export async function getSelfResource(
  selfUrl: string,
  orgLabel: string,
  projectLabel: string,
): Promise<Resource> {
  try {
    const resourceResponse: ResourceResponse = await httpGet(selfUrl, false);

    // TODO: build somehow
    // const orgLabel = '';
    // const projectLabel = '';

    const resource = new Resource(orgLabel, projectLabel, resourceResponse);
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
): Promise<Resource> {
  const projectResourceURL = `/resources/${orgLabel}/${projectLabel}/${schemaId}/${resourceId}`;
  try {
    const resourceResponse: ResourceResponse = await httpGet(
      projectResourceURL,
    );
    const resource = new Resource(orgLabel, projectLabel, resourceResponse);
    return resource;
  } catch (error) {
    throw error;
  }
}

export async function listResources(
  orgLabel: string,
  projectLabel: string,
  pagination?: PaginationSettings,
): Promise<PaginatedList<Resource>> {
  const projectResourceURL = `/resources/${orgLabel}/${projectLabel}`;
  try {
    const requestURL = pagination
      ? `${projectResourceURL}?from=${pagination.from}&size=${pagination.size}`
      : projectResourceURL;

    const listResourceResponses: ListResourceResponse = await httpGet(
      requestURL,
    );

    const total: number = listResourceResponses._total;

    // Expand the data for each item in the list
    // By fetching each item by ID
    const results: Resource[] = await Promise.all(
      listResourceResponses._results.map(async resource => {
        return await getSelfResource(resource['_self'], orgLabel, projectLabel);
      }),
    );

    return {
      total,
      results,
    };
  } catch (e) {
    return e;
  }
}

export async function updateSelfResource(
  selfUrl: string,
  rev: number,
  {
    context,
    ...data
  }: {
    context: { [field: string]: string };
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
      // TODO: build somehow
      // const orgLabel = '';
      // const projectLabel = '';
    );
    return new Resource(orgLabel, projectLabel, resourceResponse);
  } catch (error) {
    throw new Error(error);
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
    context: { [field: string]: string };
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
    throw new Error(error);
  }
}
