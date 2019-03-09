<template>
    <v-flex class="max-height">
        <SignUpForm @on-submit="onSignUpSubmitted"></SignUpForm>
    </v-flex>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import SignUpForm from '@/components/auth/SignUpForm.vue';
    import AppHelper from '@/tools/AppHelper';

    @Component({
        components: {
            Placeholder,
            SignUpForm,
        }
    })
    export default class SignUp extends Vue {
        mounted() {

        }

        onSignUpSubmitted(resultSuccess: boolean) {
            AppHelper.debug(`On SignUp Submitted: ${resultSuccess}`);
            if (resultSuccess) {
                setTimeout(() => {
                    this.$router.push({ name: 'signIn' });
                }, 1000);
            }
        }
    }
</script>


<style lang="scss" scoped>
</style>

