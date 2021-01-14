import vue from '@vitejs/plugin-vue';
import { join, resolve } from 'path';
import { defineConfig } from 'vite';

// eslint-disable-next-line import/extensions
import conf from './vue.json';

const buildApp = process.env.APP || conf.defaults;
const rootDir = resolve(__dirname);
const target = conf.apps[buildApp];

function createAlias() {
  const { apps } = conf;
  const alias = {};

  Object.keys(apps).forEach(app => alias[`/@${app}`] = resolve(join(rootDir, conf.apps[app].root, 'src')));

  return alias;
}

const Config = defineConfig({
  alias: {
    ...createAlias(),
    '/@libs': resolve(join(rootDir, 'libs'))
  },
  build: {
    manifest: true,
    minify: false,
    sourcemap: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        // includePaths: []
        // additionalData:
      }
    }
  },
  logLevel: 'error',
  optimizeDeps: {
    // include: ['axios']
  },
  plugins: [vue({
    ssr: target.ssr
  })],
  root: resolve(join(rootDir, target.root)),
  server: {
    port: target.port
  }
});

export default Config;
