# Files

[`Back to Readme`](../../#readme)

[`File Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/1.1/kg/kg-files-api.html)

```typescript
// Resources
nexus.File.get('myOrg', 'myProject', 'myID', { as: 'blob' })
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.File.poll('myOrg', 'myProject', 'myID', { pollTime: 3000 }).subscribe(d =>
  console.log('res>', d),
);

nexus.File.list('myOrg', 'myProject')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

const formData = new FormData();
formData.add(myFile);
nexus.File.create('myOrg', 'myProject', {
  '@id': 'myId',
  storage: 'myFileId',
  file: formData,
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.File.update('myOrg', 'myProject', {
  '@id': 'myId',
  storage: 'myFileId',
  file: File,
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.File.deprecate('myOrg', 'myProject', 'myFileId', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
