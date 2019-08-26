import ResourceDetails  from '../ResourceDetails';
import * as renderer from "react-test-renderer";
import React from "react";
import { shallow } from "enzyme";



it('ResourceDetails renders correctly', () => {
    const props = {
        strain: {
            "@id": "http://purl.obolibrary.org/obo/RS_0001833",
            "label": "Wistar Han"
          }, 
        species: {
            "@id": "http://purl.obolibrary.org/obo/NCBITaxon_10116",
            "label": "Rattus norvegicus"
          }, 
        types: ["EModel", "Entity"], 
        layers: [
            {
              "@id": "http://purl.obolibrary.org/obo/UBERON_0005390",
              "label": "cortical layer I"
            },
            {
              "@id": "http://purl.obolibrary.org/obo/UBERON_0005392",
              "label": "cortical layer III"
            },
            {
              "@id": "http://purl.obolibrary.org/obo/UBERON_0005394",
              "label": "cortical layer V"
            },
            {
              "@id": "http://purl.obolibrary.org/obo/UBERON_0005395",
              "label": "cortical layer VI"
            },
            {
              "@id": "http://purl.obolibrary.org/obo/UBERON_0005391",
              "label": "cortical layer II"
            },
            {
              "@id": "http://purl.obolibrary.org/obo/UBERON_0005393",
              "label": "cortical layer IV"
            }
          ], 
        brainRegion: {
            "@id": "http://purl.obolibrary.org/obo/UBERON_0008933",
            "label": "primary somatosensory cortex"
        }, 
        resource: { 
            score: 212.6819067869392, 
            seed: "1", 
            fitness:  {
                "_.APWaveform_300.soma.v.AHP_depth_abs": 1.4844549844325083,
                "_.APWaveform_300.soma.v.AP1_amp": 1.2938048460056084,
                "_.APWaveform_300.soma.v.AP_amplitude": 1.5379618971924824,
                "_.APWaveform_300.soma.v.AP_duration_half_width": 1.0126582278483314
            }, 
            params: {
                "decay_CaDynamics_DC0.axonal": 321.1455936884192,
                "decay_CaDynamics_DC0.somatic": 359.9059029669804,
                "e_pas.all": -70.84079169935472,
                "gCa_HVAbar_Ca_HVA2.axonal": 0.00018988503473868083
            }
        }
    };

    const result = shallow(<ResourceDetails {...props} />);
    expect(result).toMatchSnapshot();
});