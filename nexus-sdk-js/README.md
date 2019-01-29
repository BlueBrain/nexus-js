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

- [x] Get
- [x] List
- [x] Create
- [x] Update
- [x] Deprecate
- [x] Events

#### Projects

- [x] Get
- [x] List
- [x] Create
- [x] Update
- [x] Deprecate
- [x] Events

#### Resources

- [x] Get
- [x] List
- [x] Create
- [x] Update
- [x] Deprecate

#### Views

- [x] Get
- [x] List
- [ ] Create
- [ ] Update
- [ ] Delete

#### ElasticSearch views

- [x] Get default view for a Project
- [x] Get
- [ ] Create
- [ ] Update
- [ ] Delete
- [x] Query
- [x] Filter by type
- [x] Filter by Constrained by

#### SPARQL view

- [x] Get default view for a Project
- [x] Query
- [ ] Get incoming links
- [ ] Get outgoing links

#### Schemas

#### Resolvers

#### Data

#### ACLs

#### Permissions

#### Realms

- [x] Get
- [x] List
- [x] Create
- [x] Update
- [x] Deprecate

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
const { Nexus } = require('@bbp/nexus-sdk');
// in browser
const { Nexus } = nexusSdk; // global name is window.nexusSdk
```

## Documentation

```typescript
// You can setup your Nexus config with the static methods
Nexus.setEnvironment('http://api.url');
Nexus.setToken('my_bearer_token');
Nexus.removeToken();
```

### Organizations

```typescript
// List organisations
const paginatedOrgs: PaginatedList<Organization> = await Organization.list({
  from: 1,
  size: 100,
}); // returns { index: 1, size: 100, result: Organization[] }

// Get a specific organisation
Organization.get(orgLabel: string) : Organization;
// Create an org
Organization.create(orgLabel: string, orgDescription: string) : Organization;
// Update an org
Organization.update(orgLabel: string, orgRev: number, orgPayload: CreateOrgPayload): Organization;
// Deprecate an org
const myOrg: Organization = Organization.deprecate('myorglabel', 2);
```

### Projects

```typescript
// List all the projects that belong to an organisation
const projects: Project[] = await myOrg.listProjects();

// Get a specific project
const myProject: Project = await myOrg.getProject('my-project');
```

### Resources

```typescript
// List all the resources that belong to a project
const resources: PaginatedList<Resource> = await myProject.listResources(pagination?: PaginationSettings);

// Get a specific resource
const myResource: Resource = await myProject.getResource('schema-id', 'my-resource-id');
```

### Views

```typescript
// Fetch all View instances in a Project
const myViews: (ElasticSearchView | SparqlView)[] = await myProject.listViews();

// Fetch a view by ID
const myViewById: ElasticSearchView | SparqlView = await myProject.getView(
  'my-view-id',
);

// Fetch an ElasticSearch view by ID (for user-defined views)
const myElasticSearchView: ElasticSearchView = await myProject.getElasticSearchView(
  'my-view-id',
);

// Query an ElasticSearch view and retrieve raw results as returned by ElasticSearch
const rawResults: PaginatedList<
  ElasticSearchHit
> = await myElasticSearchView.rawQuery({});

// Fetch the default ElasticSearch view for a project
const myView: ElasticSearchView = await myProject.getElasticSearchView();

// Query a project with the default ElasticSearch view and retrieve Resources
const searchAll: PaginatedList<Resource> = await myView.query({});

// ESView Query Convenience Method
// Filter a project by Type (using AND)
const filteredByType: PaginatedList<Resource> = await myView.filterByTypes([
  'someType',
]);

// ESView Query Convenience Method
// Filter a project by resources matching a schema ("_constrainedBy")
const filteredByConstrainedBy: PaginatedList<
  Resource
> = await myView.filterByConstrainedBy('someSchema');

// Fetch the Sparql View instance on a Project
const sparqlView: SparqlView = await myProject.getSparqlView();

// Query a Project with Sparql
const response: SparqlQueryViewResponse = sparqlView.query(
  'SELECT * where {?s ?p ?o} LIMIT 50',
);
```

Each class also has static methods wrapping and reflecting the API endpoints. For example:

```typescript
import { Organization, Project, Resource } from '@bbp/nexus-sdk';

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
