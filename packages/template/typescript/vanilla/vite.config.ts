import { defineConfig, mergeConfig } from 'vite';
import TsconfigPaths from 'vite-tsconfig-paths';

import defaultConfig from './vite';

export default defineConfig(options => mergeConfig(defaultConfig(options), {
  plugins: [TsconfigPaths()],
}));
