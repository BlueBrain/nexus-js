import { parseFitnessRawParamName } from '../EModel';
import { ResourceDetails } from '../ResourceDetails';
import * as renderer from 'react-test-renderer';
import React from 'react';
import { shallow } from 'enzyme';

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
