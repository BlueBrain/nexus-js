import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const libName = pkg.name;
const UMDName = 'Nexus';

export default [
  // ES for Browsers
  {
    input: 'es/index.js',
    output: { file: 'es/nexus.mjs', format: 'es', indent: false },
    plugins: [
      nodeResolve({
        jsnext: true,
      }),
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

  // UMD Development
  {
    input: 'es/index.js',
    output: {
      file: `dist/${libName}.js`,
      format: 'umd',
      name: UMDName,
      indent: false,
    },
    plugins: [
      nodeResolve({
        jsnext: true,
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
  },

  // UMD Production
  {
    input: 'es/index.js',
    output: {
      file: `dist/${libName}.min.js`,
      format: 'umd',
      name: UMDName,
      indent: false,
    },
    plugins: [
      nodeResolve({
        jsnext: true,
      }),
      babel({
        exclude: 'node_modules/**',
      }),
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
