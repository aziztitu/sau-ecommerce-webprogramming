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
                        <v-text-field label="Name"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Username"></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <PasswordField label="Password"></PasswordField>
                    </v-flex>
                    <v-flex xs12>
                        <PasswordField label="Confirm Password"></PasswordField>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field label="Email" type="email"></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="pt-4">
                        <v-btn class="right" color="primary" @click="onSubmitClicked">
                            <span>Submit</span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-card-text>
    </v-card>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import PasswordField from '@/components/common/form/PasswordField.vue';

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

        mounted() {

        }

        onSubmitClicked() {
            if (this.msg.text === '') {
                this.msg.text = 'Coming Soon';
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
