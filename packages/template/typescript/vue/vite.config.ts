import Vue from '@vitejs/plugin-vue';
import { defineConfig, mergeConfig } from 'vite';
import TsconfigPaths from 'vite-tsconfig-paths';

import defaultConfig from './vite';

export default defineConfig(options => mergeConfig(defaultConfig(options), {
  plugins: [TsconfigPaths(), Vue()],
}));
