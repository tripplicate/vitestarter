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
  };
});
