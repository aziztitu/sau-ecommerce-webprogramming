import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import MyAccount from '@/views/dashboard/MyAccount.vue';
import Home from '@/views/dashboard/Home.vue';
import Shop from '@/views/dashboard/Shop.vue';
import Cart from '@/views/dashboard/Cart.vue';
import Orders from '@/views/dashboard/Orders.vue';
import About from '@/views/dashboard/About.vue';
import Checkout from '@/views/dashboard/Checkout.vue';
import ProductDetails from '@/views/dashboard/ProductDetails.vue';
import Admin from '@/views/dashboard/Admin.vue';

import AdminHome from '@/views/dashboard/admin/AdminHome.vue';
import AdminAccounts from '@/views/dashboard/admin/AdminAccounts.vue';
import AdminVendors from '@/views/dashboard/admin/AdminVendors.vue';
import AdminProducts from '@/views/dashboard/admin/AdminProducts.vue';

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
                    path: 'myAccount',
                    name: 'myAccount',
                    component: MyAccount,
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
                    path: 'orders',
                    name: 'orders',
                    component: Orders,
                },
                {
                    path: 'about',
                    name: 'about',
                    component: About,
                },
                {
                    path: 'product/:productId/details',
                    name: 'productDetails',
                    component: ProductDetails,
                },
                {
                    path: 'checkout',
                    name: 'checkout',
                    component: Checkout,
                },
                {
                    path: 'admin',
                    component: Admin,
                    children: [
                        {
                            path: '',
                            redirect: 'home',
                        },
                        {
                            path: 'home',
                            name: 'adminHome',
                            component: AdminHome,
                        },
                        {
                            path: 'accounts',
                            name: 'adminAccounts',
                            component: AdminAccounts,
                        },
                        {
                            path: 'vendors',
                            name: 'adminVendors',
                            component: AdminVendors,
                        },
                        {
                            path: 'products',
                            name: 'adminProducts',
                            component: AdminProducts,
                        },
                    ],
                },
            ],
        },
        {
            path: '/auth',
            component: Auth,
            children: [
                {
                    path: '',
                    redirect: 'signIn',
                },
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
