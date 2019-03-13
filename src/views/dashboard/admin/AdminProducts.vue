<template>
<div>products</div>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';


    @Component({
        components: {
            Placeholder
        }
    })
    export default class AdminProducts extends Vue {
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
</style>
