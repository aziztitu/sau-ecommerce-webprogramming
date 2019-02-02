import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Home from '@/views/dashboard/Home.vue';
import Shop from '@/views/dashboard/Shop.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Dashboard,
            children: [
                {
                    path: '/',
                    redirect: '/home'
                },
                {
                    path: '/home',
                    name: 'home',
                    component: Home,
                },
                {
                    path: '/shop',
                    name: 'shop',
                    component: Shop
                }
            ]
        },
        {
            path: '/auth',
            children: [
                {
                    path: '/signIn',
                    name: 'signIn',
                },
            ],
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
    ],
});
