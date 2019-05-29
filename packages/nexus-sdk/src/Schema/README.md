# Schemas

[`Back to Readme`](../../#readme)

[`Schema Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/1.1/kg/kg-schemas-api.html)

```typescript
// Schemas
nexus.Schema.get('myOrg', 'myProject', 'myID')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Schema.poll('myOrg', 'myProject', 'myID', { pollTime: 3000 }).subscribe(
  d => console.log('res>', d),
);

nexus.Schema.list('myOrg', 'myProject', { type: 'myType' })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Schema.create('myOrg', 'myProject', {
  '@context': {
    this:
      'https://nexus.example.com/v1/schemas/myorg/myproj/e1729302-35b8-4d80-97b2-d63c984e2b5c/shapes',
    ex: 'http://example.com/',
  },
  '@id':
    'https://nexus.example.com/v1/resources/myorg/myproj/e1729302-35b8-4d80-97b2-d63c984e2b5c',
  shapes: [
    {
      '@id': 'this:MyShape',
      '@type': 'sh:NodeShape',
      nodeKind: 'sh:BlankNodeOrIRI',
      targetClass: 'ex:Custom',
      property: [
        {
          path: 'ex:name',
          datatype: 'xsd:string',
          minCount: 1,
        },
        {
          path: 'ex:number',
          datatype: 'xsd:integer',
          minCount: 1,
        },
        {
          path: 'ex:bool',
          datatype: 'xsd:boolean',
          minCount: 1,
        },
      ],
    },
  ],
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Schema.update('myOrg', 'myProject', 'myId', 1, {
  '@context': {
    this:
      'https://nexus.example.com/v1/schemas/myorg/myproj/e1729302-35b8-4d80-97b2-d63c984e2b5c/shapes',
    ex: 'http://example.com/',
  },
  '@id':
    'https://nexus.example.com/v1/resources/myorg/myproj/e1729302-35b8-4d80-97b2-d63c984e2b5c',
  shapes: [
    {
      '@id': 'this:MyShape',
      '@type': 'sh:NodeShape',
      nodeKind: 'sh:BlankNodeOrIRI',
      targetClass: 'ex:Custom',
      property: [
        {
          path: 'ex:name',
          datatype: 'xsd:string',
          minCount: 1,
        },
        {
          path: 'ex:number',
          datatype: 'xsd:integer',
          minCount: 1,
        },
        {
          path: 'ex:bool',
          datatype: 'xsd:boolean',
          minCount: 1,
        },
      ],
    },
  ],
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Schema.deprecate('myOrg', 'myProject', 'myId', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
