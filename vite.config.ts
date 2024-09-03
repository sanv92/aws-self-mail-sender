import { defineConfig, LibraryFormats } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { terser } from 'rollup-plugin-terser'

function getLibraryBuildConfig() {
  return {
    lib: {
      entry: {
        'fetch-aws-self-mail-aws-sender-request': resolve(
          __dirname,
          `./lib/fetch-aws-self-mail-aws-sender-request/fetch-aws-self-mail-aws-sender-request.ts`,
        ),
        'env-ses-self-mail-sender-manager': resolve(
          __dirname,
          `./lib/env/env-ses-self-mail-sender-manager.ts`,
        ),
      },
      formats: ['es', 'cjs'] as LibraryFormats[],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].[format].js',
        dir: 'dist',
        plugins: [
          terser({
            compress: {
              drop_console: true,
              drop_debugger: true,
              passes: 3,
              pure_funcs: ['console.log'],
            },
            mangle: {
              properties: {
                regex: /^_/,
              },
            },
            format: {
              comments: false,
            },
          }),
        ],
      },
    },
    minify: 'terser',
    target: 'esnext',
    sourcemap: true,
    emptyOutDir: true,
  }
}

export default defineConfig({
  // @ts-ignore
  build: getLibraryBuildConfig(),
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
})
