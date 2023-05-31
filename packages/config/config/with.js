import React from '@vitejs/plugin-react';
import Vue from '@vitejs/plugin-vue';
import { mergeConfig } from 'vite';

import { standard } from './standard.js';

export const withVue = options => mergeConfig(standard(options), {
  plugins: [Vue()],
});

export const withReact = options => mergeConfig(standard(options), {
  plugins: [React()],
});
