import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

// Grab the local package.json from where rollup is calling from
const pkg = require(`${__dirname}/package.json`);

export default name => [
  // Browser Development
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.peerDependencies || {}),
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
    external: Object.keys(pkg.peerDependencies || {}),
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
    external: Object.keys(pkg.peerDependencies || {}),
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
  // cjs
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.peerDependencies || {}),
    output: {
      file: `lib/index.js`,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [typescript()],
  },
];
