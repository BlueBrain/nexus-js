import ElasticSearchView, { InvalidESViewPayloadError } from '../index';

const exampleESView = {
  '@id': 'nxv:defaultElasticIndex',
  '@type': ['View', 'Alpha', 'ElasticView'],
  _uuid: '684bd815-9273-46f4-ac1c-0383d4a98254',
  includeMetadata: true,
  mapping: {
    dynamic: false,
    properties: {
      '@id': {
        type: 'keyword',
      },
      '@type': {
        type: 'keyword',
      },
      _distribution: {
        properties: {
          '@id': {
            type: 'keyword',
          },
          '@type': {
            type: 'keyword',
          },
          _byteSize: {
            type: 'long',
          },
          _digest: {
            properties: {
              _algorithm: {
                type: 'keyword',
              },
              _value: {
                type: 'keyword',
              },
            },
            type: 'nested',
          },
          _downloadURL: {
            type: 'keyword',
          },
          _mediaType: {
            type: 'keyword',
          },
          _originalFileName: {
            type: 'keyword',
          },
        },
        type: 'nested',
      },
      _original_source: {
        type: 'text',
      },
      _self: {
        type: 'keyword',
      },
      _constrainedBy: {
        type: 'keyword',
      },
      _project: {
        type: 'keyword',
      },
      _createdAt: {
        type: 'date',
      },
      _createdBy: {
        type: 'keyword',
      },
      _updatedAt: {
        type: 'date',
      },
      _updatedBy: {
        type: 'keyword',
      },
      _rev: {
        type: 'long',
      },
      _deprecated: {
        type: 'boolean',
      },
    },
  },
  sourceAsText: true,
  _rev: 1,
  _deprecated: false,
};

describe('ElasticSearchView class', () => {
  it('should create a ElasticSearchView instance', () => {
    const view = new ElasticSearchView();
    expect(view).toBeInstanceOf(ElasticSearchView);
  });

  it('should throw an error if nothing is given', () => {
    expect(() => new ElasticSearchView()).toThrow(InvalidESViewPayloadError);
  });

  it('should convert a payload to class properties', () => {});
});
