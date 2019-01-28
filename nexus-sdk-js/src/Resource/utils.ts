import { PaginatedList } from '..';
import Resource from '.';
import { httpGet, httpPut, httpPost, httpDelete } from '../utils/http';
import {
  CreateResourcePayload,
  ResourceListTagResponse,
  ListResourceOptions,
  ResourceResponse,
  ListResourceResponse,
  ResourceResponseCommon,
} from './types';

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
  options?: ListResourceOptions,
): Promise<PaginatedList<Resource>> {
  try {
    const projectResourceURL = `/resources/${orgLabel}/${projectLabel}`;
    const requestURL = options
      ? `${projectResourceURL}?from=${options.from}&size=${options.size}`
      : projectResourceURL;

    const listResourceResponses: ListResourceResponse = await httpGet(
      requestURL,
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
        `/resources/${orgLabel}/${projectLabel}/${schemaId}/${resourceId}`,
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
    throw error;
  }
}

export async function tagResource(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  resourceId: string,
  rev: number = 1,
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
  rev: number = 1,
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
      undefined,
      false,
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
    const response: ResourceListTagResponse = await httpGet(
      `${selfUrl}/tags`,
      false,
    );
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
      false,
    );
    return new Resource(orgLabel, projectLabel, resourceResponse);
  } catch (error) {
    throw error;
  }
}
