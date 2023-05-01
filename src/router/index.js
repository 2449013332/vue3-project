// createRouter 路由
// createWebHashHistory 路由的哈希模式
import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
  {
    path: "/home",
    component: () => import("../views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
