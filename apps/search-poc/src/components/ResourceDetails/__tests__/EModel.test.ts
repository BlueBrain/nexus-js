import { parseFitnessRawParamName } from '../EModel';

describe('parseFitnessRawParamName', () => {
  it('should parse a string with leading underscore', () => {
    expect(
      parseFitnessRawParamName('_.APWaveform_300.soma.v.AHP_depth_abs'),
    ).toEqual({
      protocol: 'APWaveform 300',
      recTarget: 'soma',
      recType: 'v',
      param: 'AHP_depth_abs',
    });
  });

  it('should parse a string without leading underscore', () => {
    expect(
      parseFitnessRawParamName('.APWaveform_300.soma.v.AHP_depth_abs'),
    ).toEqual({
      protocol: 'APWaveform 300',
      recTarget: 'soma',
      recType: 'v',
      param: 'AHP_depth_abs',
    });
  });
});
