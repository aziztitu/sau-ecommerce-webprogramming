<template>
    <v-flex class="max-height">
        <SignInForm></SignInForm>
    </v-flex>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import SignInForm from '@/components/auth/SignInForm.vue';

    @Component({
        components: {
            Placeholder,
            SignInForm,
        }
    })
    export default class SignIn extends Vue {
        mounted() {
            this.checkAuth();
        }

        async checkAuth() {
            // TODO: Validate and redirect to Home if needed

            /* let data = await authService.validateApiToken();
            if (!data.success) {
                this.$router.push({ name: 'home' })
            } */
        }
    }
</script>


<style lang="scss" scoped>
</style>

