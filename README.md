[Status](#status) |
[Getting Started](#getting-started) |
[Documentation](#documentation) |
[Development](#development) |
[License](#license)

[![codecov](https://codecov.io/gh/BlueBrain/nexus-sdk-js/branch/master/graph/badge.svg)](https://codecov.io/gh/BlueBrain/nexus-sdk-js)

# JS SDK for nexus

![Nexus.js](nexus-js-logo.png)

## Status

Beta

### TODO list

#### Organizations

- [x] Get
- [x] List
- [x] Create
- [x] Update
- [x] Deprecate
- [x] Events (experimental)

#### Projects

- [x] Get
- [x] List
- [x] Create
- [x] Update
- [x] Deprecate
- [x] Events (experimental)

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
- [x] Get incoming links
- [x] Get outgoing links

#### Schemas

- [x] Get
- [x] List
- [x] Create
- [x] Update
- [x] Deprecate

#### Resolvers

- [x] Get
- [x] List
- [x] Create
- [x] Update
- [x] Tag
- [x] Deprecate

#### Data

#### ACLs

- [x] List
- [x] Create
- [x] Append
- [x] Subtract
- [x] Replace
- [x] Delete

#### Permissions

#### Realms

- [x] Get
- [x] List
- [x] Create
- [x] Update
- [x] Deprecate

#### Files

- [x] Get
- [ ] List
- [x] Create
- [ ] Update
- [ ] Deprecate

#### Statistics

- [x] Get

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
// You can setup your Nexus config globally with the static methods
// this is useful on the client
Nexus.setEnvironment('http://api.url');
Nexus.setToken('my_bearer_token');
Nexus.removeToken();

// and then use it like
// Organization.get
// Project.get
// etc...

// on the server you might want to create an instance
// and pass this down to your request context
const nexusUser = new Nexus({
  environment: 'http://api.url',
  token: 'user_bearer_token',
});
const nexusUser2 = new Nexus({
  environment: 'http://api.url',
  token: 'user2_bearer_token',
});

// then you can do
// nexusUser.Organization.get
// nexusUser2.Organization.get
// nexusUser.Project.get
```

The SDK follows the same pattern when dealing with an organization, project, resource, realm, acl, etc...:

- represented by a class that can be instantiated with the result payload of the REST API
- the class exposes static methods like `get`, `list`, `create`, `update` and `deprecate` i.e.: `Resource.create(/* args */)`
- instance of a class have methods for self-modifications, children access and other convenience methods i.e.: `orgInstance.listProjects()`, `projectInstance.deprecate(), elasticSearchViewInstance.filterByTypes()`

### Organizations

```typescript
import { Organization } from '@bbp/nexus-sdk';
// or
const nexus = new Nexus({ environment, token});
const Organization = nexus.Organization

Organization.get = (orgLabel: string, options?: undefined | object): Promise<Organization>;

Organization.list = (options?: ListOrgOptions): Promise<PaginatedList<Organization>>;

Organization.create = (label: string, orgPayload?: CreateOrgPayload): Promise<Organization>;

Organization.update = (orgLabel: string, rev: number, orgPayload: CreateOrgPayload): Promise<Organization>;

Organization.deprecate = (orgLabel: string, rev: number): Promise<Organization>;

orgInstance.update(orgPayload: CreateOrgPayload): Promise<Organization>;

orgInstance.deprecate(): Promise<Organization>;

orgInstance.getProject(projectLabel: string): Promise<Project>;

orgInstance.listProjects(): Promise<PaginatedList<Project>>;

orgInstance.createProject(projectLabel: string, projectPayload: CreateProjectPayload): Promise<Project>;

orgInstance.updateProject(projectLabel: string, projectRev: number, projectPayload: CreateProjectPayload): Promise<Project>;

orgInstance.deprecateProject(projectLabel: string, projectRev: number): Promise<Project>

// EXPERIMENTAL
Organization.subscribe = (listeners: OrgEventListeners): EventSource;
```

### Projects

```typescript
import { Project } from '@bbp/nexus-sdk';
// or
const nexus = new Nexus({ environment, token});
const Project = nexus.Project

Project.get = (orgLabel: string, projectLabel: string, options?: undefined | object): Promise<Project>;

Project.list = (orgLabel: string, options?: ListProjectOptions): Promise<PaginatedList<Project>>;

Project.create = (orgLabel: string, projectLabel: string, projectPayload: CreateProjectPayload): Promise<Project>;

Project.update = (orgLabel: string, projectLabel: string, rev: number, projectPayload: CreateProjectPayload): Promise<Project>;

Project.deprecate = (orgLabel: string, projectLabel: string, rev: number): Promise<Project>;

projectInstance.update(projectPayload: CreateProjectPayload): Promise<Project>;

projectInstance.deprecate(): Promise<Project>

projectInstance.getResource(id: string): Promise<Resource>;

projectInstance.listResource(pagination?: PaginationSettings): Promise<PaginatedList<Resource>>;

projectInstance.getView(viewId: string): Promise<ElasticSearchView | SparqlView>;

projectInstance.listViews(): Promise<(ElasticSearchView | SparqlView)[]>

projectInstance.getSparqlView(): Promise<SparqlView>;

projectInstance.getElasticSearchView(viewId?: undefined | string): Promise<ElasticSearchView>;

// EXPERIMENTAL
Project.subscribe = (listeners: ProjectEventListeners): EventSource;
```

### Schemas

```typescript
import { Schema } from '@bbp/nexus-sdk';

Schema.get = (orgLabel: string, projectLabel: string, schemaId: string): Promise<Schema>;

Schema.list = (orgLabel: string, projectLabel: string, options?: ListSchemaOptions): Promise<PaginatedList<Schema>>;

Schema.listTags = (orgLabel: string, projectLabel: string, schemaId: string): Promise<string[]>;

Schema.create = (orgLabel: string, projectLabel: string, payload: CreateSchemaPayload): Promise<Schema>;

Schema.tag = (orgLabel: string, projectLabel: string, schemaId: string, rev: number, {
    tagName,
    tagFromRev,
  }: {
    tagName: string;
    tagFromRev: number;
  }): Promise<Schema>;

Schema.update = (orgLabel: string, projectLabel: string, schemaId: string, rev: number, {
    context,
    ...data
  }: {
    context: { [field: string]: string };
    [field: string]: any;
  }): Promise<Schema>;

Schema.deprecate = (orgLabel: string, projectLabel: string, schemaId: string, rev: number): Promise<Schema>;

```

### Resources

```typescript
import { Resource } from '@bbp/nexus-sdk';

Resource.get = (orgLabel: string, projectLabel: string, schemaId: string, resourceId: string): Promise<Resource>;
Resource.getSelf = (selfUrl: string, getResourceOptions = { expanded: true }): Promise<Resource>;
Resource.getSelfRawAs = (selfUrl: string, resourceFormat?: ResourceGetFormat ): Promise<Resource>;

Resource.list = (orgLabel: string, projectLabel: string, options?: ListResourceOptions): Promise<PaginatedList<Resource>>;

Resource.listTags = (orgLabel: string, projectLabel: string, schemaId: string, resourceId: string): Promise<string[]>;
Resource.listSelfTags = (selfUrl: string): Promise<string[]>;

Resource.create = (orgLabel: string, projectLabel: string, schemaId: string, payload: CreateResourcePayload): Promise<Resource>;

Resource.tag = (orgLabel: string, projectLabel: string, schemaId: string, resourceId: string, rev: number, {
    tagName,
    tagFromRev,
  }: {
    tagName: string;
    tagFromRev: number;
  }): Promise<Resource>;
Resource.tagSelf = (selfUrl: string, rev: number, {
    tagName,
    tagFromRev,
  }: {
    tagName: string;
    tagFromRev: number;
  }, orgLabel: string, projectLabel: string): Promise<Resource>;

Resource.update = (orgLabel: string, projectLabel: string, schemaId: string, resourceId: string, rev: number, {
    context,
    ...data
  }: {
    context: { [field: string]: string };
    [field: string]: any;
  }): Promise<Resource>;
Resource.updateSelf = (selfUrl: string, rev: number, {
    context,
    ...data
  }: {
    context: { [field: string]: string };
    [field: string]: any;
  }, orgLabel: string, projectLabel: string): Promise<Resource>;

Resource.deprecate = (orgLabel: string, projectLabel: string, schemaId: string, resourceId: string, rev: number): Promise<Resource>;
Resource.deprecateSelf = (selfUrl: string, rev: number, orgLabel: string, projectLabel: string): Promise<Resource>;

// Instance Methods
resourceInstance.update({
    context,
    ...data
  }: {
    context: { [field: string]: string };
    [field: string]: any;
  }): Promise<Resource>;

resourceInstance.getExpanded = () =>: Promise

// EXPERIMENTAL
resourceInstance.getStatistics(): Promise<Statistics>


// Links! 🔗🔗🔗🔗

const incomingLinks: PaginatedList<ResourceLinks> = await Resource.getIncomingLinks(
  orgLabel: string,
  projectLabel: string,
  expandedID: string,
  { from: 0, size: 20}: PaginationSettings);

const outgoingLinks: PaginatedList<ResourceLinks> = await Resource.getOutgoingLinks(
  orgLabel: string,
  projectLabel: string,
  expandedID: string,
  { from: 0, size: 20}: PaginationSettings);

const incomingLinks: PaginatedList<ResourceLinks> = await resourceInstance.getIncomingLinks({ from: 0, size: 20}: PaginationSettings);
const outgoingLinks: PaginatedList<ResourceLinks> = await resourceInstance.getOutgoingLinks({ from: 0, size: 20}: PaginationSettings);
```

### Files

```typescript
import { NexusFile } from '@bbp/nexus-sdk';

NexusFile.create = (orgLabel: string, projectLabel: string, payload: File | Blob | ReadableStream | ReadStream | Readable): Promise<File>;

// examples in browser
NexusFile.create('myorg', 'myproject', new Blob(['abc'], { type: "text/plain"}));
NexusFile.create('myorg', 'myproject',  new File(["foo"], "foo.txt", {
  type: "text/plain",
}));

// examples in node
NexusFile.create('myorg', 'myproject', fs.createReadStream('/path/to/my/file'));

const buffer = new Buffer('abc');
const stream = new Readable();
stream.push(buffer);
stream.push(null);
NexusFile.create('myOrg', 'myProject', stream);
```

### Views

```typescript
import { View, ElasticSearchView, SparqlView } from '@bbp/nexus-sdk';

View.get = (orgLabel: string, projectLabel: string, viewId: string): Promise<ElasticSearchView | SparqlView>;

View.list = (orgLabel: string, projectLabel: string): Promise<(ElasticSearchView | SparqlView)[]>;

ElasticSearchView.get = (orgLabel: string, projectLabel: string, viewId?: string): Promise<ElasticSearchView>;

SparqlView.get = (orgLabel: string, projectLabel: string): Promise<SparqlView>;

elasticSearchInstance.aggregation(elasticSearchAggregationQuery: object): Promise<ElasticSearchViewAggregationResponse>;

elasticSearchInstance.filterByConstrainedBy(constrainedBy: string, pagination?: PaginationSettings): Promise<PaginatedList<Resource>>;

elasticSearchInstance.filterByTypes(types: string[], pagination?: PaginationSettings): Promise<PaginatedList<Resource>>;

// Query a project with the default ElasticSearch view and retrieve Resources
elasticSearchInstance.query(elasticSearchQuery: object, pagination?: PaginationSettings): Promise<PaginatedList<Resource>>;

// Query an ElasticSearch view and retrieve raw results as returned by ElasticSearch
elasticSearchInstance.rawQuery(elasticSearchQuery: object, pagination?: PaginationSettings): Promise<PaginatedList<ElasticSearchHit>>;

// EXPERIMENTAL
elasticSearchInstance.getStatistics(): Promise<Statistics>

sparqlInstance.query(sparqlQuery: string): Promise<SparqlViewQueryResponse>;

// EXPERIMENTAL
sparqlInstance.getStatistics(): Promise<Statistics>
```

### Resolver

```typescript
import { Resolver } from '@bbp/nexus-sdk';

Resolver.get(): Promise<Resolver>;

Resolver.list(orgLabel: string, projectLabel: string, options?: ListResolverOptions): <Promise<PaginatedList<Resolver>>;

Resolver.create(orgLabel: string, projectLabel: string, resolverId: string | null, resolverPayload: CrossProjectResolverPayload, method: "POST" | "PUT" = "PUT"): Promise<Resolver>;

Resolver.update(orgLabel: string, projectLabel: string, resolverId: string, previousRev: number, resolverPayload: CrossProjectResolverPayload): Promise<Resolver>

Resolver.tag(orgLabel: string, projectLabel: string, resolverId: string, previousRev: number, tagPayload: TagResolverPayload): Promise<Resolver>

Resolver.deprecate(orgLabel: string, projectLabel: string, resolverId: string, previousRev: number): Promise<Resolver>

resolverInstance.update(resolverPayload: CrossProjectResolverPayload): Promise<Resolver>;

resolverInstance.tag(tagPayload: TagResolverPayload): Promise<Resolver>;

resolverInstance.deprecate(): Promise<Resolver>;
```

### Realm

```typescript
import { Realm } from '@bbp/nexus-sdk';

Realm.get = (realmLabel: string, rev?: undefined | number): Promise<Realm>;

Realm.list = (listRealmOptions?: ListRealmOptions): Promise<PaginatedList<Realm>>;

Realm.create = (realmLabel: string, realmPayload: CreateRealmPayload): Promise<Realm>;

Realm.update = (realmLabel: string, rev: number, realmPayload: CreateRealmPayload): Promise<Realm>;

Realm.deprecate = (realmLabel: string, rev: number): Promise<Realm>;
```

### ACL

```typescript
import { ACL } from '@bbp/nexus-sdk';

ACL.list = (path: string, options?: ListACLOptions): Promise<PaginatedList<ACL>>;

ACL.create = (path: string, payload: ACLPayload[]): Promise<any>;

ACL.append = (path: string, rev: number, payload: ACLPayload[]): Promise<any>;

ACL.subtract = (path: string, rev: number, payload: ACLPayload[]): Promise<any>;

ACL.replace = (path: string, rev: number, payload: ACLPayload[]): Promise<any>;

ACL.delete = (path: string, rev: number): Promise<any>;
```

### Statistics (Experimental)

```typescript
import { Statistics } from '@bbp/nexus-sdk';

Statistics.getViewStatistics = (orgLabel: string, projectLabel: string, schemaId: string, viewId: string): Promise<Statistics>;

Statistics.getResourceStatistics(orgLabel: string, projectLabel: string, resourceId): Promise<Statistics>;
```

## Development

> If you don't have Node.js installed on your machine, you can run a "docker shell" with `make dshell` from which you'll have a fully working Node.js environment.
> Make sure you have already installed both [Docker Engine](https://docs.docker.com/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

- Install: `npm install`
- Build: `npm run build`
- Test: `npm run test`
- Lint: `npm run lint`
- Generate Documentation: `npm run documentation`

# License

- [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0)
