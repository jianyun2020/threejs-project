import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/indoorroaming",
      name: "IndoorRoaming",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/IndoorRoaming.vue"),
    },
    {
      path: "/indoorroaming2",
      name: "IndoorRoaming2",
      component: () => import("../views/IndoorRoaming2.vue"),
    },
    {
      path: "/cube2048",
      name: "Cube2048",
      component: () => import("../views/Cube2048.vue"),
    },
    {
      path: "/smartcity",
      name: "SmartCity",
      component: () => import("../views/SmartCity.vue"),
    },
  ],
});

export default router;
