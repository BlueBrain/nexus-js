[Status](#status) |
[Getting Started](#getting-started) |
[Documentation](#documentation) |
[Development](#development) |
[License](#license)

# JS SDK for nexus

![Nexus.js](nexus-js-logo.png)

## Status

Pre-alpha

### TODO list

#### Organizations

- [x] Get by label
- [x] List Orgs // blocked, needs re-factor
- [x] Create
- [x] Update
- [x] Delete

#### Projects

- [x] Get by label
- [x] List Projects
- [x] Create
- [x] Update
- [x] Delete

#### Resources

- [x] Get by <schema ID, resource ID>
- [x] Get by self URL
- [ ] Create
- [x] Update
- [ ] Delete

#### Views

- [ ] Get by id // blocked
- [x] List Views
- [ ] Create
- [ ] Update
- [ ] Delete

#### Elasticsearch views

- [ ] Create
- [ ] Update
- [ ] Delete
- [x] Query
- [x] Filter by type
- [x] Filter by Constrained by

#### Sparql view

- [x] Query
- [ ] Get incoming links
- [ ] Get outgoing links

#### Schemas

#### Resolvers

#### Data

#### ACLs

#### Permissions

#### Realms

## Getting started

### Installation

```bash
npm i -S @bbp/nexus-sdk
```

### Add to your project

```javascript
// ES modules
import Nexus from '@bbp/nexus-sdk';
// Node.js
const Nexus = require('@bbp/nexus-sdk');
// in browser
const Nexus = nexusSdk; // global name is window.nexusSdk
```

## Documentation

```typescript
// Setup your Nexus config
Nexus.setEnvironment('http://api.url');
Nexus.setToken('my_bearer_token');
Nexus.removeToken();

// List all organisations
const orgs: Organization[] = await Nexus.listOrganizations();

// Get a specific organisation
const myOrg: Organization = await Nexus.getOrganization('my-org');

// Create an Organisation
const myNewOrg = await Nexus.createOrganization('myorglabel', 'MyOrgName');

// List all the projects that belong to an organisation
const projects: Project[] = await myOrg.listProjects();

// Get a specific project
const myProject: Project = await myOrg.getProject('my-project');

// List all the resources that belong to a project
const resources: PaginatedList<Resource> = await myProject.listResources(pagination?: PaginationSettings);

// Get a specific resource
const myResource: Resource = await myProject.getResource('schema-id', 'my-resource-id');

// Fetch all Elastic Search View instances in a Project
const myViews: ElasticSearchView[] = await myProject.listElasticSearchViews()

// Query a project with Elastic Search
const searchAll: PaginatedList<Resource> = await myView.query({});

// ESView Query Convenience Method
// Filter a project by Type (using AND)
const filteredByType: PaginatedList<Resource> = await myView.filterByTypes(["someType"])

// ESView Query Convenience Method
// Filter a project by resources matching a schema ("_constrainedBy")
const filteredByConstrainedBy: PaginatedList<Resource> = await myView.filterByConstrainedBy("someSchema")

// Fetch the Sparql View instance on a Project
const sparqlView: SparqlView = await myProject.getSparqlView();

// Query a Project with Sparql
const response: SparqlQueryViewResponse = sparqlView.query('SELECT * where {?s ?p ?o} LIMIT 50');
```

Each class also has static methods wrapping and reflecting the API endpoints. For example:

```typescript
import { Organization, Project, Resource } from '@bbp/nexus-sdk';
// or
const { Organization, Project, Resource } = require('@bbp/nexus-sdk');

const org: Organization = Organization.get('org-label');
const project: Project = Project.get('org-label', 'project-label');
const resource: Resource = Resource.get(
  'org-label',
  'project-label',
  'schema-id',
  'resource-id',
);
```

## Development

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

# License

- [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.)
