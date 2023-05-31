import { join } from 'node:path/posix';

import Autoprefixer from 'autoprefixer';
import { loadEnv } from 'vite';
import Tsconfigpaths from 'vite-tsconfig-paths';

export const CONSTANTS = {
  input: 'index.html',
  outDir: 'build',
  assetsDir: 'assets',
  publicDir: 'public',
  envPrefix: 'VITE',
  chunkFileNames: '[name]-[hash].js',
  entryFileNames: '[name]-[hash].js',
  assetFileNames: '[name]-[hash].[ext]',
};

export const standard = ({ mode, }) => {
  const { HOST, PORT, API_PRIVATE_DEFAULT, } = loadEnv(mode, process.cwd(), '');

  const {
    input, outDir, assetsDir, publicDir, envPrefix, chunkFileNames, assetFileNames, entryFileNames,
  } = CONSTANTS;

  return {
    server: {
      host: HOST,
      port: Number.parseInt(PORT),
      proxy: {
        '/api': {
          target: API_PRIVATE_DEFAULT,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
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
    resolve: {
      alias: {
        '@': join('src'),
        '@dd': join('src', 'design', 'default'),
      },
    },
    plugins: [Tsconfigpaths(), Autoprefixer()],
  };
};
