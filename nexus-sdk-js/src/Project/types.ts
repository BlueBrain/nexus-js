export interface PrefixMapping {
  prefix: string;
  namespace: string;
}

export interface CreateProjectPayload {
  name: string;
  base: string;
  prefixMappings: PrefixMapping[];
}
