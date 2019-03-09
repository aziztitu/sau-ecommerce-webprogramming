// @ts-ignore
import colors from 'vuetify/es5/util/colors';

export default {
    title: 'Grocery Store - Shop Online',
    mode: process.env.NODE_ENV,
    api: {
        baseURL: process.env.VUE_APP_API_BASE_URL,
    },
    recaptcha: {
        siteKey: process.env.VUE_APP_RECAPTCHA_SITE_KEY,
    },
};

export const defaultTheme = {
    primary: colors.cyan.darken3,
    secondary: colors.cyan.darken4,
    accent: colors.orange.accent3,
};
