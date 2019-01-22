export interface ApiMapping {
  prefix: string;
  namespace: string;
}

export interface CreateProjectPayload {
  description?: string;
  base?: string;
  vocab?: string;
  apiMappings?: ApiMapping[];
}

export interface ListProjectOptions {
  q?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  [option: string]: any;
}

export type Context = string | string[];
