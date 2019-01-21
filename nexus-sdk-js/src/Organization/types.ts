export interface ListOrgOptions {
  full_text_search?: string;
  from?: number;
  size?: number;
  deprecated?: boolean;
  [key: string]: any;
}

export interface CreatOrgPayload {
  description?: string;
}
export type Context = string | string[];
