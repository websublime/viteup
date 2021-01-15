import './assets/index.css';

import type { App } from 'vue';

import { router } from './routing';

export function setup(app: App): void {
  app.use(router);
}
