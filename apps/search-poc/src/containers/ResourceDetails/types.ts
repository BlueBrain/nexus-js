import { Resource } from '@bbp/nexus-sdk';

export interface BrainRegion {
  '@id': string;
  label: string;
}

export interface Layer {
  '@id': string;
  label: string;
}

export interface BrainLocation {
  brainRegion: BrainRegion;
  layer: Layer[] | undefined;
}

export interface Distribution {
  '@type': string;
  contentUrl: string;
}

export interface MINDSResource {
  brainLocation: BrainLocation;
  name: string;
  description: string;
  distribution: Distribution;
}

export interface EModelResource {
  seed: number;
  score: number;
  fitness: {
    [key: string]: number;
  };
  params: {
    [key: string]: number;
  };
}

export interface SimulationCampaignSimulation {
  startedAtTime: string;
  endedAtTime: string;
  status: string;
  job_id: string;
  path: string;
  self: string;
}

export enum SimulationStatusEnum {
  RUNNING = 'Running',
  FAILED = 'Failed',
  DONE = 'Done',
  PENDING = 'Pending',
}

export interface ResourceLink {
  '@id': string;
  '@type': string;
  label?: string;
}

export interface SimulationCampaignResource extends Resource, MINDSResource {
  startedAtTime: string;
  endedAtTime: string;
  status: SimulationStatusEnum;
  simulations: SimulationCampaignSimulation[];
  used?: ResourceLink[];
}

export interface SimulationResource extends Resource, MINDSResource {
  startedAtTime: string;
  endedAtTime: string;
  generated: ResourceLink;
  status: SimulationStatusEnum;
  jobId: string;
  path: string;
}

export interface SimWriterConfigResource extends Resource, MINDSResource {
  template: {
    url: string;
    data: any;
  };
  configuration: {
    url: string;
    data: any;
  };
  target?: {
    url: string;
    data: any;
  };
}

export interface DetailedCircuitResource extends Resource, MINDSResource {
  edgeCollection: ResourceLink;
  nodeCollection: ResourceLink;
  species: ResourceLink;
  target: ResourceLink;
  wasAttributedTo: ResourceLink;
  circuitBase: {
    url: string;
  };
  circuitType?: string;
}
