# Projects

[`Back to Readme`](../../#readme)

[`Project Documentation on BlueBrainNexus.io`](https://bluebrainnexus.io/docs/api/1.1/admin/admin-projects-api.html)

```typescript
// Projects
nexus.Project.list('myOrg')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Project.create('myOrg', 'myProject', {
  description: 'What a fine description of my project.',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Project.update('myOrg', 'myProject', 1, {
  description: 'What a fine description of my project.',
})
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Project.deprecate('myOrg', 'myProject', 1)
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));

nexus.Project.get('myOrg', 'myProject')
  .then(d => console.log('res>', d))
  .catch(e => console.error(e));
```
