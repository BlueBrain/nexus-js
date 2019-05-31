import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const libName = 'nexus-sdk';
const umdName = 'nexusSdk';

export default [
  // Browser Development
  {
    input: 'src/index.ts',
    output: {
      file: `dist/${libName}.js`,
      format: 'umd',
      name: umdName,
      indent: false,
    },
    plugins: [
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },

  // Browser Production
  {
    input: 'src/index.ts',
    output: {
      file: `dist/${libName}.min.js`,
      format: 'umd',
      name: umdName,
      indent: false,
    },
    plugins: [
      typescript(),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false,
        },
      }),
    ],
  },
];
