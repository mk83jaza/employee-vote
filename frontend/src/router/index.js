import { createRouter, createWebHistory } from 'vue-router'
import Vote from "../views/Vote";

const routes = [
    {
        path: '/vote',
        name: 'Vote',
        component: Vote
    },
    {
        path: '/statistics',
        name: 'Statistics',
        component: () => import(/* webpackChunkName: "statistics" */ '../views/Statistics.vue')
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/vote'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
