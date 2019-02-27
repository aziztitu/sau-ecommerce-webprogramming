<template>
    <v-card>
        <v-card-title class="pa-0">
            <v-toolbar color="primary" dark>
                <span class="title">Sign In</span>
            </v-toolbar>
            <!-- <span class="title">Sign In</span> -->
        </v-card-title>
        <v-alert
            class="ma-0"
            :value="(msg.text !== '')"
            :color="(msg.error ? 'error' : 'success')"
            transition="slide-down-simple"
        >{{msg.text}}</v-alert>
        <v-card-text>
            <v-form class="pt-3" v-if="!authModule.accountData">
                <v-layout column>
                    <v-flex xs12>
                        <v-text-field label="Username" v-model="username" @keyup.enter="submit"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <PasswordField v-model="password" @keyup.enter="submit"></PasswordField>
                    </v-flex>
                    <v-flex xs12 class="pt-4">
                        <v-btn class="right" color="primary" @click="submit">
                            <span>Submit</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
            <v-flex v-else>
                <span>You're already signed in!</span>
            </v-flex>
        </v-card-text>
    </v-card>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import PasswordField from '@/components/common/form/PasswordField.vue';
    import authModule, { AccountData } from '@/store/modules/authModule';

    @Component({
        components: {
            PasswordField
        }
    })
    export default class SignInForm extends Vue {
        msg = {
            error: false,
            text: ""
        }

        username = "";
        password = "";

        get authModule() {
            return authModule;
        }

        async submit() {
            this.msg = {
                error: false,
                text: 'Signing in...',
            };

            console.log(this.username);
            console.log(this.password);
            let res = await authModule.login({ username: this.username, password: this.password });
            if (res.data.success) {
                this.msg = {
                    error: false,
                    text: 'Signed in successfully',
                };
                // this.goToHome();
            } else {
                this.msg = {
                    error: true,
                    text: res.data.message,
                };
            }
        }

        goToHome() {
            this.$router.push({ name: 'home' });
        }
    }
</script>

<style lang="scss" scoped>
</style>
