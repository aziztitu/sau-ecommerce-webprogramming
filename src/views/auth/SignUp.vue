<template>
    <v-flex class="max-height">
        <SignUpForm></SignUpForm>
    </v-flex>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import SignUpForm from '@/components/auth/SignUpForm.vue';

    @Component({
        components: {
            Placeholder,
            SignUpForm,
        }
    })
    export default class SignIn extends Vue {
        mounted() {

        }
    }
</script>


<style lang="scss" scoped>
</style>

