import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home-view/HomeView.vue"),
  },
  {
    path: "/add",
    name: "contact-add",
    component: () => import("../views/contact-view/ContactView.vue"),
  },
  {
    path: "/edit/:id",
    name: "contact-edit",
    component: () => import("../views/contact-view/ContactView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
