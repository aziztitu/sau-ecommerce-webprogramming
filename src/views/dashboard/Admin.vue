<template>
    <v-layout column class="max-height max-width">
            <transition name="router-view-switch-default" appear mode="out-in">
                <router-view></router-view>
            </transition>
    </v-layout>
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
    export default class Admin extends Vue {
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
</style>
