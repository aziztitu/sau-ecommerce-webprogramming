<template>
    <div id="auth">
        <NavToolbar>
            <router-link to="../login" append tag="v-btn" class="v-btn--flat route-indicator">Login</router-link>
            <router-link to="../signUp" append tag="v-btn" class="v-btn--flat route-indicator">Sign Up</router-link>
        </NavToolbar>
        <v-content class="auth-content">
            <v-container class="auth-container" fluid>
                <v-layout class="auth-layout" row justify-center mt-5>
                    <v-flex xs12 sm8 md6 lg4>
                        <transition name="router-view-switch-default" appear mode="out-in">
                            <keep-alive>
                                <router-view></router-view>
                            </keep-alive>
                        </transition>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
        <v-footer app>
            <v-container pa-0>
                <v-layout>
                    <v-flex>Made with ❤️ by Azee</v-flex>
                    ©️ {{ new Date().getFullYear() }}
                </v-layout>
            </v-container>
        </v-footer>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import AppConfig from '@/AppConfig';
    import NavToolbar from '@/components/common/navigation/NavToolbar.vue';

    @Component({
        components: {
            NavToolbar,
        },
    })
    export default class Auth extends Vue {

    }

</script>

<style lang="scss" scoped>
    .auth-content {
        min-height: 100vh;
    }

    .auth-container {
        display: flex;
        min-height: 100%;
    }

    .auth-layout {
        min-height: 100%;
    }
</style>

