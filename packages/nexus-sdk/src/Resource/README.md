# Resources

[`Back to Readme`](../../#readme)

[`Resource Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/delta/api/current/kg-resources-api.html)

```typescript
// Resources
nexus.Resource.get('myOrg', 'myProject', 'myID')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Resource.poll('myOrg', 'myProject', 'myID', { pollTime: 3000 }).subscribe(
  d => console.log('res>', d),
);

// listing within specified organisation and project
nexus.Resource.list('myOrg', 'myProject', { type: 'myType' })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

// listing within specified organisation
nexus.Resource.list('myOrg', undefined, { type: 'myType' })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

// listing across all organisations/projects
nexus.Resource.list(undefined, undefined, { type: 'myType' })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

// list Incoming or Outgoing links
nexus.Resource.links('myOrg', 'myProject', 'myID', 'incoming', {
  from: 0,
  size: 20,
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Resource.create('myOrg', 'myProject', {
  '@id': 'myId',
  '@context': 'myContext',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Resource.update('myOrg', 'myProject', 'myId', 1, {
  someFieldToChange: 'Why hello there!',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Resource.deprecate('myOrg', 'myProject', 'myId', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

// get the original payload of a resource:
nexus.Resource.getSource('myOrg', 'myProject', 'myResourceId', 'schemaId', {
  rev: 1,
  tag: 'tag',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

// list tags defined by a specified revision of resource
nexus.Resource.tags('myOrg', 'myProject', 'myResourceId', 'schemaId', {
  rev: 1,
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

// list tags defined by a specified tag
nexus.Resource.tags('myOrg', 'myProject', 'myResourceId', 'schemaId', {
  tag: 'myTagName',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

// list tags defined on latest revision of resource
nexus.Resource.tags('myOrg', 'myProject', 'myResourceId', 'schemaId')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
