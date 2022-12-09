// globals styles
import '../src/styles/index.scss';
import createCache from '@emotion/cache';
import { ThemeProvider, CacheProvider } from '@emotion/react';
import { theme } from '../src/shared/theme';
import { globalStyles } from '../src/shared/globals.styled';
import React from 'react';

// Default Setting
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  // Add Custom Background
  backgrounds: {
    default: 'bgWhite',
    values: [
      {
        name: 'bgWhite',
        value: '#fafafa'
      },
      {
        name: 'white',
        value: '#FFFFFF'
      },
      {
        name: 'black',
        value: '#212121'
      }
    ]
  }
};

const cache = createCache({
  prepend: true,
  key: 'sb',
  ...((process.env.NODE_ENV === 'development' || 'test') && {
    stylisPlugins: []
  })
});

export const decorators = [
  (Story) => (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {globalStyles}
        <Story />
      </ThemeProvider>
    </CacheProvider>
  )
];
