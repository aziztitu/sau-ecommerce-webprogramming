<template>
    <v-card>
        <v-card-title class="pa-0">
            <v-toolbar color="primary" dark>
                <span class="title">Sign Up</span>
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
            <v-form class="pt-3">
                <v-layout column wrap>
                    <v-flex xs12>
                        <v-text-field label="Name" v-model="name" @keyup.enter="submit"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Username" v-model="username" @keyup.enter="submit"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <PasswordField label="Password" v-model="password" @keyup.enter="submit"></PasswordField>
                    </v-flex>
                    <v-flex xs12>
                        <PasswordField
                            label="Confirm Password"
                            v-model="confirmPassword"
                            @keyup.enter="submit"
                        ></PasswordField>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                            label="Email"
                            type="email"
                            v-model="email"
                            @keyup.enter="submit"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="pt-4">
                        <v-btn class="right" color="primary" @click="submit">
                            <span>Submit</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card-text>
    </v-card>
</template>


<script lang='ts'>
    import lodash from 'lodash';
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import PasswordField from '@/components/common/form/PasswordField.vue';
    import authModule from '@/store/modules/authModule';
    import { Emit } from 'vue-property-decorator';
    import AppHelper from '@/tools/AppHelper';

    @Component({
        components: {
            PasswordField
        }
    })
    export default class SignUpForm extends Vue {
        msg = {
            error: false,
            text: ""
        }

        name = "";
        username = "";
        password = "";
        email = "";
        confirmPassword = "";

        mounted() {

        }

        @Emit('on-submit')
        async submit() {
            if (this.password === this.confirmPassword) {
                let { name, username, password, email } = this;

                let res = await authModule.signup({
                    name,
                    username,
                    password,
                    email,
                });

                if (res.data.success) {
                    this.msg = {
                        text: "Signed up successfully!",
                        error: false,
                    }

                    this.resetForm();
                } else {
                    let errMsg = res.data.message;

                    let { errorReport } = res.data;
                    if (errorReport) {
                        let { code, errors } = errorReport;

                        if (errors) {
                            let firstError = errors[(() => { for (let error in errors) { return error; } })() as any];
                            AppHelper.debug(firstError);

                            if (firstError.kind === 'required') {
                                errMsg = `${lodash.capitalize(firstError.path)} is required`;
                            }
                        }

                        if (code) {
                            switch (code) {
                                case 11000:
                                    errMsg = "User already exists!";
                                    break;
                            }
                        }
                    }



                    this.msg = {
                        text: errMsg,
                        error: true,
                    }
                }
                return res.data.success;
            } else {
                this.msg = {
                    text: "Passwords don't match!",
                    error: true,
                }
            }

            return false;
        }

        resetForm() {
            this.name = "";
            this.username = "";
            this.password = "";
            this.confirmPassword = "";
            this.email = "";
        }
    }
</script>

<style lang="scss" scoped>
</style>
