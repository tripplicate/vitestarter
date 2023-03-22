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
}

export interface Environment {
  PORT: string
  HOST: string
  API_BASE: string
}
