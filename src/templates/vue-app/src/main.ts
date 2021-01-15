import { createApp } from 'vue';
import App from './modules/application/app.vue';

import { setup } from './provision';

function boot() {
  const app = createApp(App);

  setup(app);

  app.mount('#app');
}

boot();
