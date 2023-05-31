import { standard } from '@vitestarter/config';
import { defineConfig, mergeConfig } from 'vite';

export default defineConfig(options => mergeConfig(standard(options)));
