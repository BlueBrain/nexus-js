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
