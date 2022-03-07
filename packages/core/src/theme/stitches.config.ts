import { createStitches } from '@stitches/react';

import common from './common';

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  styled,
  theme
} = createStitches({
  ...common
});
