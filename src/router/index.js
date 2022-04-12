import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/home.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/game',
        name: 'game',
        component: () => import('@/views/game.vue')
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

