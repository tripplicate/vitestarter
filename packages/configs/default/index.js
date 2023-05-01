import { parse } from 'node:path';
import { createHash } from 'node:crypto';

import { defineConfig, loadEnv } from 'vite';

export const CONSTANTS = {
  input: 'index.html',
  outDir: 'build',
  assetsDir: 'assets',
  cacheDir: '.vite',
  publicDir: 'public',
  envPrefix: 'VITE',
  chunkFileNames: '[name]-[hash].js',
  entryFileNames: '[name]-[hash].js',
  assetFileNames: '[name]-[hash].[ext]',
};

export default defineConfig(({ mode, }) => {
  const { HOST, PORT, API_BASE, } = loadEnv(mode, process.cwd(), '');

  const {
    input, outDir, assetsDir, cacheDir, publicDir, envPrefix, chunkFileNames, assetFileNames, entryFileNames,
  } = CONSTANTS;

  return {
    server: {
      host: HOST,
      port: Number.parseInt(PORT),
      proxy: {
        '/api': {
          target: API_BASE,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    cacheDir,
    publicDir,
    envPrefix,
    build: {
      outDir,
      assetsDir,
      rollupOptions: {
        input,
        output: {
          chunkFileNames,
          assetFileNames,
          entryFileNames,
        },
      },
    },
    test: {
      environment: 'jsdom',
    },
    css: {
      modules: {
        localsConvention: 'dashes',
        generateScopedName(name, path) {
          const generateHash = secret => createHash('SHA256', secret).update(secret).digest('hex').slice(0, 6);

          const filename = parse(path)?.name.replace(/\.module$/, '').toLowerCase();

          const filenamehash = generateHash(filename);
          const namehash = generateHash(name + filename);

          if (name === 'root') return `${ filename }_${ filenamehash }-${ namehash }`;

          return `${ name }_${ filenamehash }-${ namehash }`;
        },
      },
    },
  };
});
