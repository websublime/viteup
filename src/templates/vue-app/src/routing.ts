import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { homeRouting } from './modules/home/routing';

const routes: Array<RouteRecordRaw> = [
  ...homeRouting
];

const history = createWebHistory('/');

export const router = createRouter({
  history,
  routes
});
