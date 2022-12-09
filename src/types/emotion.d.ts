/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-interface */
import type { ThemeTypes } from '#/shared/theme';

declare module '@emotion/react' {
  export interface Theme extends ThemeTypes {}
}
