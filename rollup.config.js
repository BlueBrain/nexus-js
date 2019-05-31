import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const libName = 'nexus-sdk';
const umdName = 'nexusSdk';

export default name => [
  // Browser Development
  {
    input: 'src/index.ts',
    output: {
      file: `dist/index.js`,
      format: 'umd',
      name: name,
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
      file: `dist/index.min.js`,
      format: 'umd',
      name: name,
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

  // es modules
  {
    input: 'src/index.ts',
    output: {
      file: `es/index.js`,
      format: 'esm',
      sourcemap: true,
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
