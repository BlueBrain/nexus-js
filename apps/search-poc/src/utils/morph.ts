
import swcParser from 'swcmorphologyparser';


const CONVERTER_URL = 'http://morph-service.ocp.bbp.epfl.ch/converter/api';

export function convertToSwc(blob: Blob): Promise<String> {
  const formData = new FormData();
  formData.append('output_extension', '.swc');
  formData.append('isBlob', 'true');
  formData.append('file', new File([blob], 'file.asc'));

  return fetch(CONVERTER_URL, { method: 'POST', body: formData })
    .then(res => res.text())
}

export function parseSwc(swcMorph: string): Object {
  const parser = new swcParser.SwcParser()
  parser.parse(swcMorph);
  return parser.getRawMorphology();
}
