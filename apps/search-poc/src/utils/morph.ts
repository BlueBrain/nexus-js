
import swcParser from 'swcmorphologyparser';

import { MORPH_CONVERTER_URL } from './../config';


export function convertToSwc(blob: any): Promise<string> {
  const formData = new FormData();
  formData.append('output_extension', '.swc');
  formData.append('isBlob', 'true');
  formData.append('file', new File([blob], 'file.asc'));

  return fetch(MORPH_CONVERTER_URL, { method: 'POST', body: formData })
    .then(res => res.text())
}

export function parseSwc(swcMorph: string): object {
  const parser = new swcParser.SwcParser()
  parser.parse(swcMorph);
  return parser.getRawMorphology();
}
