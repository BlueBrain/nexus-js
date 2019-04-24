import { PaginatedList } from '..';
import { httpGet, httpPut, httpPost, httpDelete } from '../utils/http';
import { buildQueryParams } from '../utils';
import {
  SchemaResponse,
  ListSchemaOptions,
  ListSchemaResponse,
  SchemaResponseCommon,
  CreateSchemaPayload,
  SchemaListTagResponse,
} from './types';
import Schema from '.';
import { DEFAULT_PAGINATION_SETTINGS } from '../utils/types';

export async function getSchema(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  options?: { rev?: number; tag?: string },
): Promise<Schema> {
  const opts = buildQueryParams(options);
  const projectSchemaURL = `/schemas/${orgLabel}/${projectLabel}/${schemaId}${opts}`;
  try {
    const schemaResponse: SchemaResponse = await httpGet(projectSchemaURL);
    const schema = new Schema(orgLabel, projectLabel, schemaResponse);
    return schema;
  } catch (error) {
    throw error;
  }
}

export async function listSchemas(
  orgLabel: string,
  projectLabel: string,
  options?: ListSchemaOptions,
): Promise<PaginatedList<Schema>> {
  try {
    const opts = buildQueryParams(options);
    const listSchemaResponses: ListSchemaResponse = await httpGet(
      `/schemas/${orgLabel}/${projectLabel}${opts}`,
    );
    const total: number = listSchemaResponses._total;
    const index: number =
      (options && options.from) || DEFAULT_PAGINATION_SETTINGS.from;
    const results: Schema[] = listSchemaResponses._results.map(
      (commonResponse: SchemaResponseCommon) =>
        new Schema(orgLabel, projectLabel, {
          ...commonResponse,
          '@context': listSchemaResponses['@context'],
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

export async function createSchema(
  orgLabel: string,
  projectLabel: string,
  payload: CreateSchemaPayload,
): Promise<Schema> {
  try {
    let schema: Schema;
    // if no schemaID provided, we POST the new schema (Nexus will create the ID for us)
    if (!payload.schemaId) {
      const { context, ...rest } = payload;
      const schemaResponse: SchemaResponse = await httpPost(
        `/schemas/${orgLabel}/${projectLabel}`,
        {
          '@context': context,
          ...rest,
        },
      );
      schema = new Schema(orgLabel, projectLabel, schemaResponse);
    } else {
      // Otherwise, it's a PUT request
      const { context, schemaId, ...rest } = payload;
      const schemaResponse: SchemaResponse = await httpPut(
        `/schemas/${orgLabel}/${projectLabel}/${schemaId}`,
        {
          '@context': context,
          ...rest,
        },
      );
      schema = new Schema(orgLabel, projectLabel, schemaResponse);
    }

    return schema;
  } catch (error) {
    throw error;
  }
}

export async function updateSchema(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  rev: number,
  payload: CreateSchemaPayload,
): Promise<Schema> {
  const schemaURL = `/schemas/${orgLabel}/${projectLabel}/${schemaId}`;
  try {
    const { context, ...rest } = payload;
    const schemaResponse: SchemaResponse = await httpPut(
      `${schemaURL}?rev=${rev}`,
      {
        '@context': context,
        ...rest,
      },
    );
    return new Schema(orgLabel, projectLabel, schemaResponse);
  } catch (error) {
    throw error;
  }
}

export async function tagSchema(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  rev: number,
  {
    tagName,
    tagFromRev,
  }: {
    tagName: string;
    tagFromRev: number;
  },
): Promise<Schema> {
  try {
    const schemaResponse: SchemaResponse = await httpPost(
      `/schemas/${orgLabel}/${projectLabel}/${schemaId}/tags?rev=${rev}`,
      {
        tag: tagName,
        rev: tagFromRev,
      },
    );
    return new Schema(orgLabel, projectLabel, schemaResponse);
  } catch (error) {
    throw error;
  }
}

export async function listSchemaTags(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
): Promise<string[]> {
  try {
    const response: SchemaListTagResponse = await httpGet(
      `/schemas/${orgLabel}/${projectLabel}/${schemaId}/tags`,
    );
    return response.tags;
  } catch (error) {
    throw error;
  }
}

export async function deprecateSchema(
  orgLabel: string,
  projectLabel: string,
  schemaId: string,
  rev: number,
): Promise<Schema> {
  try {
    const schemaResponse: SchemaResponse = await httpDelete(
      `/schemas/${orgLabel}/${projectLabel}/${schemaId}?rev=${rev}`,
    );
    return new Schema(orgLabel, projectLabel, schemaResponse);
  } catch (error) {
    throw error;
  }
}
