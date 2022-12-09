// import clear from 'rollup-plugin-clear';
// import scss from 'rollup-plugin-scss';
// import postcss from 'rollup-plugin-postcss';
// import autoprefixer from 'autoprefixer';
// import bundleSize from 'rollup-plugin-bundle-size';
// import typescript from '@rollup/plugin-typescript';
// // import typescript from 'rollup-plugin-typescript2';
// // import ttypescript from 'ttypescript';
// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import dts from 'rollup-plugin-dts';
// import pkg from './package.json';

// const isProd = process.env.NODE_ENV === 'production';

// const input = 'src/index.ts';

// const plugins = [
//   clear({ targets: ['dist', 'lib'] }),
//   bundleSize(),
//   resolve(),
//   commonjs(),
//   typescript({
//     tsconfig: './tsconfig.json',
//     exclude: ['**/*.stories.tsx']
//   }),
//   // typescript({
//   //   clean: false,
//   //   tsconfig: './tsconfig.json',
//   //   typescript: ttypescript
//   // }),
//   scss({
//     failOnError: true,
//     outputStyle: 'compressed'
//   }),
//   postcss({
//     minimize: false,
//     plugins: [
//       autoprefixer
//       // cssnano,
//       // postcss-mixins,
//       // postcss-preset-env
//     ],
//     inject: { insertAt: 'top' }
//   })
// ];

// const external = [...Object.keys(pkg.peerDependencies || {})];

// const esmOutput = {
//   input,
//   output: {
//     file: pkg.module,
//     format: 'esm',
//     sourcemap: true
//   },
//   plugins,
//   external
// };

// const cjsOutput = {
//   input,
//   output: {
//     file: pkg.main,
//     format: 'cjs',
//     sourcemap: true
//   },
//   plugins,
//   external
// };

// const types = {
//   input: 'dist/types/index.d.ts',
//   output: [{ file: 'dist/index.d.ts', format: 'cjs' }],
//   external: [/\.scss$/],
//   plugins: [dts.default()]
// };

// export default isProd ? [cjsOutput, esmOutput, types] : [cjsOutput, types];

/* eslint-disable global-require */
import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';
import path from 'path';

import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';

import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import postcssMixins from 'postcss-mixins';
import postcssPresetEnv from 'postcss-preset-env';

const lib = require('./package.json');

const namedInput = `./src/index.ts`;
const year = new Date().getFullYear();
const banner = `// NordClan-UI v${lib.version} Copyright (c) ${year} ${lib.author} and contributors`;

const buildConfig = ({ browser = true, minifiedVersion = true, ...config }) => {
  const { file } = config.output;
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  const extArr = ext.split('.');
  extArr.shift();

  const build = ({ minified }) => ({
    ...config,
    output: {
      ...config.output,
      file: `${path.dirname(file)}/${basename}.${(minified ? ['min', ...extArr] : extArr).join('.')}`
    },
    plugins: [
      clear({ targets: ['dist', 'lib'] }),
      external(),
      resolve({ browser }),
      commonjs(),
      minified && terser(),
      minified && bundleSize(),
      typescript({
        clean: false,
        tsconfig: './tsconfig.json',
        typescript: ttypescript,
        exclude: ['**/*.stories.tsx']
      }),
      scss({
        failOnError: true,
        outputStyle: 'compressed'
      }),
      postcss({
        plugins: [autoprefixer, cssnano, postcssMixins, postcssPresetEnv]
      }),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-react'],
        include: ['src/**/*.ts', 'src/**/*.tsx'],
        exclude: ['node_modules/**', 'stories/**'],
        extensions: ['.js', '.ts', '.tsx']
      })
    ]
  });

  const configs = [build({ minified: false })];

  if (minifiedVersion) {
    configs.push(build({ minified: true }));
  }

  return configs;
};

export default [
  // Browser CJS bundle
  ...buildConfig({
    input: namedInput,
    minifiedVersion: false,
    output: {
      file: `dist/index.cjs`,
      format: 'cjs',
      sourcemap: true,
      banner
    }
  }),
  // Create Declaration types
  {
    input: 'dist/src/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'cjs' }],
    external: [/\.scss$/],
    plugins: [dts.default()]
  }
];
