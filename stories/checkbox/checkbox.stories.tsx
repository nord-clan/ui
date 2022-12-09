/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import type { Meta, Story } from '@storybook/react';

import { ThemeProvider } from '@emotion/react';
import type { ThemeTypes } from '#/shared/theme';
import { theme as themeLight, themeBlue, themeDark } from '#/shared/theme';

import { Checkbox } from '#/index';

const meta: Meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    children: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
};

export default meta;

interface IStoriesThirdProps {
  themesAvailable: ThemeTypes[];
  theme: 0 | 1 | 2;
}

//* - 1 ---------------------------------------------------------------- *//

const Template: Story<IStoriesThirdProps> = ({ themesAvailable, theme, ...props }) => {
  return (
    <ThemeProvider theme={themesAvailable[theme]}>
      <h1>Checkbox</h1>
    </ThemeProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  themesAvailable: [themeLight, themeBlue, themeDark],
  theme: 0
};
