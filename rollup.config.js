/* eslint-disable global-require */
import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';
import scss from 'rollup-plugin-scss';
import postcss from 'rollup-plugin-postcss';
import path from 'path';

const lib = require('./package.json');

const namedInput = `./src/index.ts`;

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
        tsconfig: './tsconfig.json',
        exclude: ['**/*.stories.tsx']
      }),
      scss({
        failOnError: true,
        outputStyle: 'compressed'
      }),
      postcss({
        plugins: [require('cssnano'), require('postcss-mixins'), require('postcss-preset-env')]
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

export default async () => {
  const year = new Date().getFullYear();
  const banner = `// NordClan-UI v${lib.version} Copyright (c) ${year} ${lib.author} and contributors`;

  return [
    // Browser CJS bundle
    ...buildConfig({
      input: namedInput,
      minifiedVersion: false,
      output: {
        file: `dist/index.cjs`,
        format: 'cjs',
        banner
      }
    }),
    {
      input: 'dist/types/index.d.ts',
      output: [{ file: 'dist/index.d.ts', format: 'cjs' }],
      external: [/\.scss$/],
      plugins: [dts.default()]
    }
  ];
};
