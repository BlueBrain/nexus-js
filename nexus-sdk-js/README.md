# SDK for nexus

## Develop

### With Node.js

- Install: `npm install`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`
- Generate Documentation: `npm run documentation`

### With Docker

Make sure you have already installed both [Docker Engine](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

- Install: `make install`
- Build: `make build`
- Test: `make test`
- Lint: `make lint`
- Generate Documentation: `make documentation`

## Usage

```typescript
import Nexus from 'nexus-sdk';

// Create a Nexus instance
const nexus: Nexus = new Nexus({
  environment: 'http://api.url',
  token: 'my_bearer_token', // optional
});

// List all organisations
const orgs: Organization[] = await nexus.listOrganizations();

// Get a specific organisation
const myOrg: Organization = await nexus.getOrganization('my-org');

// Create an Organisation
const myNewOrg = await nexus.createOrganization('myorglabel', 'MyOrgName');

// List all the projects that belong to an organisation
const projects: Project[] = await myOrg.listProjects();

// Get a specific project
const myProject: Project = await myOrg.getProject('my-project');

// List all the resources that belong to a project
const resources: PaginatedList<Resource> = await myProject.listResources(pagination?: PaginationSettings);

// Get a specific resource
const myResource: Resource = await myProject.getResource('my-resource');
```

# License

- [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
