# Resources

[`Back to Readme`](../../#readme)

[`Resource Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/1.1/kg/kg-resources-api.html)

```typescript
// Resources
nexus.Resource.get('myOrg', 'myProject', 'myID')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Resource.poll('myOrg', 'myProject', 'myID', { pollTime: 3000 }).subscribe(
  d => console.log('res>', d),
);

nexus.Resource.list('myOrg', 'myProject', { type: 'myType' })
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
```
