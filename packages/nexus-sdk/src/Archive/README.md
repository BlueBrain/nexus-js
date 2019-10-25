# Resources

[`Back to Readme`](../../#readme)

[`Archive Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/current/kg/kg-archives-api.html)

```typescript
// Archive
nexus.Archive.get('myOrg', 'myProject', 'myID')
  .then(d => console.log('archive >', d))
  .catch(e => console.error(e));



nexus.Archive.create('myOrg', 'myProject', {
  'resources': [
     {
      '@type': 'File',
       resourceId: 'resourceId',
       project: '',
     },
    {
      '@type': 'Resource',
       resourceId: 'resourceId',
       project: 'anotherProjectId',
    }
  ]
})
.then(d => console.log('archive >', d))
.catch(e => console.error(e));

// Uses put and returns an Archive resource which contains an Id
nexus.Archive.create('myOrg', 'myProject', {
  'archiveId': 'myId',
   'resources': [
     {
      '@type': 'File',
       resourceId: 'resourceId',
       project: '',
     }
    ]
})
.then(d => console.log('archive >', d))
.catch(e => console.error(e));

```