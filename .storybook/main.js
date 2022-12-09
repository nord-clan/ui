const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const toPath = (_path) => path.join(process.cwd(), _path);

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
    {
      name: 'storybook-addon-sass-postcss',
      options: {
        sassLoaderOptions: {
          implementation: require('sass')
        },
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  babel: async (options) => {
    return {
      ...options,
      plugins: [
        ...options.plugins,
        [
          '@emotion',
          {
            sourceMap: true,
            autoLabel: 'dev-only',
            labelFormat: '[local]',
            cssPropOptimization: true
          }
        ]
      ]
    };
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '#': path.resolve(__dirname, '../src/'),
      '#S': path.resolve(__dirname, '../src/style/'),
      '#C': path.resolve(__dirname, '../src/components/'),
      '#H': path.resolve(__dirname, '../src/hooks/'),
      '@emotion/css': toPath('node_modules/@emotion/css'),
      '@emotion/core': toPath('node_modules/@emotion/react'),
      '@emotion/styled': toPath('node_modules/@emotion/styled'),
      'emotion-theming': toPath('node_modules/@emotion/react')
    };

    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions
      })
    ];

    return config;
  }
};
