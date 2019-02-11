import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Home from '@/views/dashboard/Home.vue';
import Shop from '@/views/dashboard/Shop.vue';
import Cart from '@/views/dashboard/Cart.vue';
import About from '@/views/dashboard/About.vue';

import Auth from '@/views/Auth.vue';
import SignIn from '@/views/auth/SignIn.vue';
import SignUp from '@/views/auth/SignUp.vue';

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
                    path: '',
                    redirect: 'home',
                },
                {
                    path: 'home',
                    name: 'home',
                    component: Home,
                },
                {
                    path: 'shop',
                    name: 'shop',
                    component: Shop,
                },
                {
                    path: 'cart',
                    name: 'cart',
                    component: Cart,
                },
                {
                    path: 'about',
                    name: 'about',
                    component: About,
                },
            ],
        },
        {
            path: '/auth',
            component: Auth,
            children: [
                {
                    path: 'signIn',
                    name: 'signIn',
                    component: SignIn,
                },
                {
                    path: 'signUp',
                    name: 'signUp',
                    component: SignUp,
                },
            ],
        },
    ],
});
