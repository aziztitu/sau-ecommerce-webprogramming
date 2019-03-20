import Vue from 'vue';
import App from './App.vue';
import router from './router';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

//@ts-ignore
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css'

import { defaultTheme } from './AppConfig';
import store from './store/';

Vue.config.productionTip = false;

Vue.use(Vuetify, { theme: defaultTheme });
Vue.use(VueAwesomeSwiper);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
