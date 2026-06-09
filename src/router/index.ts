import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("../pages/home/HomePage.vue"),
        },
        {
            path: "/pokemon/:id",
            component: () => import("../pages/pokemon/PokemonPage.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/",
        },
    ],
});
