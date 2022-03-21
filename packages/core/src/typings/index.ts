import type * as Stitches from '@stitches/react';

import { config } from '../theme';

export interface DefaultProps {
  css: Stitches.CSS<typeof config>;
}

export type DefaultSizes = 'sm' | 'md' | 'lg';

export type DefaultRadii = 'sm' | 'md' | 'lg';

export type DefaultColors =
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'pink'
  | 'red'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'orange'
  | 'black';
