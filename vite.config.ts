import { defineConfig, loadEnv } from 'vite'
import ViteTsconfigPaths from 'vite-tsconfig-paths'

import { CONSTANTS } from './vite/config'
import type { Environment } from './vite/config'

import { ViteTsconfigPathsConfig } from './vite/plugins/vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  const { HOST, PORT, API_BASE } = loadEnv(mode, process.cwd(), '') as unknown as Environment
  const { input, outDir, assetsDir, cacheDir, publicDir, envPrefix, chunkFileNames, assetFileNames, entryFileNames } = CONSTANTS

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
    plugins: [ViteTsconfigPaths(ViteTsconfigPathsConfig)],
  }
})
