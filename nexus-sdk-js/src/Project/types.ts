export interface PrefixMapping {
  prefix: string;
  namespace: string;
}

export interface CreateProjectPayload {
  name: string;
  base?: string;
  prefixMappings?: PrefixMapping[];
}

export interface ListProjectOptions {
  q?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  [option: string]: any;
}
