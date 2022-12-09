import React from 'react';
import { css, Global } from '@emotion/react';

import { breakpoint, theme } from './theme';

const globalStyles = (
  <Global
    styles={css`
      html {
        scrollbehavior: 'smooth';
      }
      body {
        min-height: 100%;
        padding: 0;
        margin: 0;
        font-family: 'Rubik', sans-serif, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
        font-size: ${`${theme.typography.htmlFontSizeSm}px`};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        ${breakpoint('md')} {
          font-size: ${`${theme.typography.htmlFontSize}px`};
        }
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      * {
        box-sizing: border-box;
      }
    `}
  />
);

export default globalStyles;
