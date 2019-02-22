import { SchemaResponse, ListSchemaResponse } from '../types';

export const mockSchemaResponse: SchemaResponse = {
  '@context': [
    {
      ex: 'http://example.com/',
      this:
        'https://nexus.example.com/v1/schemas/myorg/myproj/e1729302-35b8-4d80-97b2-d63c984e2b5c/shapes',
    },
    'https://bluebrain.github.io/nexus/contexts/shacl-20170720.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  '@id': 'https://bluebrain.github.io/nexus/schemas/myschema2',
  '@type': 'Schema',
  shapes: [
    {
      '@id': 'this:MyShape',
      '@type': 'NodeShape',
      nodeKind: 'BlankNode:OrIRI',
      property: [
        {
          datatype: 'xsd:string',
          minCount: 1,
          path: 'ex:name',
        },
        {
          datatype: 'xsd:boolean',
          minCount: 1,
          path: 'ex:bool',
        },
        {
          datatype: 'xsd:integer',
          minCount: 1,
          path: 'ex:number',
        },
      ],
      targetClass: 'ex:Custom',
    },
  ],
  _self:
    'https://nexus.example.com/v1/schemas/myorg/myproj/base:e1729302-35b8-4d80-97b2-d63c984e2b5c',
  _constrainedBy:
    'https://bluebrain.github.io/nexus/schemas/shacl-20170720.ttl',
  _project: 'https://nexus.example.com/v1/projects/myorg/myproj',
  _rev: 4,
  _deprecated: true,
  _createdAt: '2018-09-17T14:55:42.939Z',
  _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
  _updatedAt: '2018-09-17T15:05:42.939Z',
  _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
};

export const mockListSchemaResponse: ListSchemaResponse = {
  '@context': [
    'https://bluebrain.github.io/nexus/contexts/search.json',
    'https://bluebrain.github.io/nexus/contexts/resource.json',
  ],
  _total: 1,
  _results: [
    {
      '@id': 'https://bluebrain.github.io/nexus/schemas/myschema2',
      '@type': 'https://bluebrain.github.io/nexus/vocabulary/Schema',
      _self:
        'https://nexus.example.com/v1/schemas/myorg/myproj/base:e1729302-35b8-4d80-97b2-d63c984e2b5c',
      _constrainedBy:
        'https://bluebrain.github.io/nexus/schemas/shacl-20170720.ttl',
      _project: 'https://nexus.example.com/v1/projects/myorg/myproj',
      _rev: 4,
      _deprecated: true,
      _createdAt: '2018-09-17T14:55:42.939Z',
      _createdBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
      _updatedAt: '2018-09-17T15:05:42.939Z',
      _updatedBy: 'https://nexus.example.com/v1/realms/myrealm/users/john',
    },
  ],
};