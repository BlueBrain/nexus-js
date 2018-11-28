# SDK for nexus

## Develop

- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`
- Generate Documentation: `npm run documentation`

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

// List all the projects that belong to an organisation
const projects: Project[] = await myOrg.listProjects();

// Get a specific project
const myProject: Project = await myOrg.getProject('my-project');
```

# License

- [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
