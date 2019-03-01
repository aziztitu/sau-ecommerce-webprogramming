// @ts-ignore
import colors from 'vuetify/es5/util/colors';

export default {
    title: 'Grocery Store - Shop Online',
    mode: process.env.NODE_ENV,
    api: {
        baseURL: process.env.VUE_APP_API_BASE_URL,
    },
};

export const defaultTheme = {
    primary: colors.cyan.darken3,
    secondary: colors.cyan.darken4,
    accent: colors.orange.accent3,
};
