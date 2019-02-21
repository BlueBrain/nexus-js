import { resetMocks, mock, mockResponse } from 'jest-fetch-mock';
import Schema from '..';
import {
  listSchemas,
  getSchema,
  createSchema,
  deprecateSchema,
  tagSchema,
  listSchemaTags,
} from '../utils';
import Nexus from '../../Nexus';
import { PaginatedList } from '../../utils/types';
import { CreateSchemaPayload } from '../types';
import {
  mockSchemaResponse,
  mockListSchemaResponse,
} from '../__mocks__/mockSchemaResponses';

const baseUrl = 'http://api.url';
Nexus.setEnvironment(baseUrl);

describe('Schema class', () => {
  it('It should create a Schema instance', () => {
    const schema: Schema = new Schema('myorg', 'myproject', mockSchemaResponse);
    expect(schema).toMatchSnapshot();
  });

  describe('listSchemas()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockListSchemaResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should call httpGet method with the proper get views url', async () => {
      const schema: PaginatedList<Schema> = await listSchemas(
        'myorg',
        'myproject',
      );
      expect(mock.calls[0][0]).toEqual(`${baseUrl}/schemas/myorg/myproject`);
      expect(schema.total).toEqual(1);
      expect(schema.results[0]).toBeInstanceOf(Schema);
    });

    it('should call httpGet method with the proper pagination', async () => {
      await listSchemas('myorg', 'myproject', { from: 2, size: 20 });
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/schemas/myorg/myproject?from=2&size=20`,
      );
    });
  });

  describe('getSchema()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockSchemaResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should call httpGet method with the proper get views url', async () => {
      const schema: Schema = await getSchema('myorg', 'myproject', 'myschema');
      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/schemas/myorg/myproject/myschema`,
      );
      expect(schema).toBeInstanceOf(Schema);
    });
  });

  describe('createSchema()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockSchemaResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should POST the new schema', async () => {
      const payload: CreateSchemaPayload = {
        context: {
          name: 'http://schema.org/name',
          description: 'http://schema.org/description',
        },
        shapes: [
          {
            '@id': 'http://some-id.com',
            '@type': 'some:type',
            nodeKind: 'myKindOfNode',
            property: [{ datatype: 'type', minCount: 2, path: '/my/path' }],
            targetClass: 'myTarget',
          },
        ],
      };

      createSchema('myorg', 'myproject', payload);

      expect(mock.calls[0][0]).toEqual(`${baseUrl}/schemas/myorg/myproject`);
      expect(mock.calls[0][1].method).toEqual('POST');
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify({
          '@context': payload.context,
          shapes: payload.shapes,
        }),
      );
    });

    it('should PUT the new schema', async () => {
      const payload: CreateSchemaPayload = {
        context: {
          name: 'http://schema.org/name',
          description: 'http://schema.org/description',
        },
        shapes: [
          {
            '@id': 'http://some-id.com',
            '@type': 'some:type',
            nodeKind: 'myKindOfNode',
            property: [{ datatype: 'type', minCount: 2, path: '/my/path' }],
            targetClass: 'myTarget',
          },
        ],
        schemaId: 'myschema',
      };

      createSchema('myorg', 'myproject', payload);

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/schemas/myorg/myproject/myschema`,
      );
      expect(mock.calls[0][1].method).toEqual('PUT');
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify({ '@context': payload.context, shapes: payload.shapes }),
      );
    });
  });

  describe('deprecateSchema()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockSchemaResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should deprecate the schema', async () => {
      await deprecateSchema('myorg', 'myproject', 'myschema', 2);

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/schemas/myorg/myproject/myschema?rev=2`,
      );
      expect(mock.calls[0][1].method).toEqual('DELETE');
    });
  });

  describe('tagSchema()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockSchemaResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should tag the schema', async () => {
      await tagSchema('myorg', 'mylabel', 'myschema', 3, {
        tagName: 'mytag',
        tagFromRev: 2,
      });

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/schemas/myorg/mylabel/myschema/tags?rev=3`,
      );
      expect(mock.calls[0][1].method).toEqual('POST');
      expect(mock.calls[0][1].body).toEqual(
        JSON.stringify({ tag: 'mytag', rev: 2 }),
      );
    });
  });

  describe('getTags()', () => {
    beforeEach(() => {
      mockResponse(JSON.stringify(mockSchemaResponse), { status: 200 });
    });

    afterEach(() => {
      resetMocks();
    });

    it('should tag the schema', async () => {
      await listSchemaTags('myorg', 'myproject', 'myschema');

      expect(mock.calls[0][0]).toEqual(
        `${baseUrl}/schemas/myorg/myproject/myschema/tags`,
      );
    });
  });
});
