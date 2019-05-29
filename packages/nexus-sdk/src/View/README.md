# Views

[`Back to Readme`](../../#readme)

[`View Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/1.1/kg/kg-storages-api.html)

```typescript
// Views
nexus.View.get('myOrg', 'myProject', 'myID')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.View.poll('myOrg', 'myProject', 'myID', { pollTime: 3000 }).subscribe(d =>
  console.log('res>', d),
);

nexus.View.list('myOrg', 'myProject', { type: 'myType' })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.View.create('myOrg', 'myProject', {
  '@type': ['ElasticSearchView'],
  mapping: {
    dynamic: false,
    properties: {
      '@id': {
        type: 'keyword',
      },
      '@type': {
        type: 'keyword',
      },
      name: {
        type: 'keyword',
      },
      number: {
        type: 'long',
      },
      bool: {
        type: 'boolean',
      },
    },
  },
  includeMetadata: false,
  sourceAsText: false,
  resourceSchemas: 'https://bluebrain.github.io/nexus/schemas/myschema',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.View.update('myOrg', 'myProject', 'myId', 1, {
  '@type': ['ElasticSearchView'],
  mapping: {
    dynamic: false,
    properties: {
      '@id': {
        type: 'keyword',
      },
      '@type': {
        type: 'keyword',
      },
      name: {
        type: 'keyword',
      },
      number: {
        type: 'long',
      },
      bool: {
        type: 'boolean',
      },
    },
  },
  includeMetadata: false,
  sourceAsText: false,
  resourceSchemas: 'https://bluebrain.github.io/nexus/schemas/myschema',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.View.deprecate('myOrg', 'myProject', 'myId', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.View.tag('myOrg', 'myProject', 'myId', 1, {
  tag: 'mytag',
  rev: 1,
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.View.elasticSearchQuery('myOrg', 'myProject', 'myId', {
  query: {
    term: {
      _deprecated: true,
    },
  },
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.View.sparqlQuery(
  'myOrg',
  'myProject',
  'myId',
  `
  SELECT ?s ?p ?o WHERE {?s ?p ?o} LIMIT 20
`,
)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.View.statistics('myOrg', 'myProject', 'myId')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
