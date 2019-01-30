<template>
    <Placeholder></Placeholder>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import App, { AppEventType } from '@/App.vue';
    import Logo from '@/components/common/app/Logo.vue';
    import Placeholder from '@/views/misc/Placeholder.vue';

    @Component({
        components: {
            Logo,
            Placeholder,
        },
    })
    export default class Home extends Vue {
    }
</script>

<style lang="scss" scoped>
</style>

