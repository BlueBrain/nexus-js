export interface PrefixMapping {
  prefix: string;
  namespace: string;
}

export interface ProjectResponse {
  '@id': string;
  '@context': string;
  '@type': string;
  name: string;
  base: string;
  _rev: number;
  _deprecated: boolean;
  _createdAt: string;
  _createdBy: string;
  _updatedAt: string;
  _updatedBy: string;
  prefixMappings: PrefixMapping[];
  _label?: string;
  _uuid?: string;
  _self?: string;
  _constrainedBy?: string;
}

export default class Project {
  id: string;
  context: string;
  type: string;
  name: string;
  base: string;
  version: number;
  deprecated: boolean;
  createdAt: Date;
  updatedAt: Date;
  prefixMappings: PrefixMapping[];

  constructor(projectResponse: ProjectResponse) {
    this.id = projectResponse['@id'];
    this.context = projectResponse['@context'];
    this.type = projectResponse['@type'];
    this.name = projectResponse.name;
    this.base = projectResponse.base;
    this.version = projectResponse._rev;
    this.deprecated = projectResponse._deprecated;
    this.createdAt = new Date(projectResponse._createdAt);
    this.updatedAt = new Date(projectResponse._updatedAt);
    this.prefixMappings = projectResponse.prefixMappings;
  }

  async tag() {}
  async update() {}
  async delete() {}
}
