import replace from 'rollup-plugin-replace';
import typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import node from 'rollup-plugin-node-resolve';

export const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@bbp/react-nexus': 'reactNexus',
  '@bbp/nexus-sdk': 'nexusSdk',
  '@bbp/nexus-link': 'nexusLink',
};

export default name => [
  // Browser Development
  {
    input: 'src/index.ts',
    output: {
      file: `dist/index.js`,
      format: 'umd',
      name: name,
      globals,
      indent: false,
      exports: 'named',
    },
    external: Object.keys(globals),
    plugins: [
      node(),
      typescriptPlugin({
        typescript,
        tsconfig: './tsconfig.json',
        tsconfigOverride: {
          compilerOptions: {
            module: 'es2015',
          },
        },
      }),
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
      globals,
      indent: false,
    },
    external: Object.keys(globals),
    plugins: [
      typescriptPlugin(),
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
      globals,
      sourcemap: true,
    },
    external: Object.keys(globals),
    plugins: [
      typescriptPlugin(),
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
    output: {
      file: `lib/index.js`,
      format: 'cjs',
      globals,
      sourcemap: true,
    },
    external: Object.keys(globals),
    plugins: [typescriptPlugin()],
  },
];
