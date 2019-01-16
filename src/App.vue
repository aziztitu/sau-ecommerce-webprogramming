<template>
    <div id="app">
        <v-app :dark="darkThemeMode">
            <router-view/>
            <SnackBar></SnackBar>
        </v-app>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { TypedEvent } from '@/tools/external/TypedEvent.ts';
    import SnackBar from '@/components/singleton/SnackBar.vue';

    export enum AppEventType {
        ThemeChanged,
    }

    @Component({
        components: {
            SnackBar,
        }
    })
    export default class App extends Vue {

        public static instance: App;

        public appEventEmitter: TypedEvent<AppEventType> = new TypedEvent();

        private darkThemeMode = false;

        constructor() {
            super();
            App.instance = this;
        }

        public switchTheme() {
            this.darkThemeMode = !this.darkThemeMode;

            // To emit the event after a delay (after the classes have been properly applied to all elements).
            setTimeout(() => {
                this.appEventEmitter.emit(AppEventType.ThemeChanged);
            }, 100);
        }
    }
</script>


<style lang="scss">
    @import "@/scss/common/constants.scss";

    @import "@/scss/common/global.scss";
    @import "@/scss/common/transitions.scss";
</style>

<style lang="scss" scoped>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        min-height: 100%;
    }
</style>

