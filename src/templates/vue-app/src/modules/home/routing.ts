import { defineAsyncComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';

export const homeRouting: Array<RouteRecordRaw> = [
  {
    // eslint-disable-next-line max-len
    component: () => new Promise(resolve => resolve(defineAsyncComponent(() => import('./home.page.vue')))),
    name: 'Home',
    path: ''
  }
];
