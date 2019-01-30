<template>
    <transition name="nav-toolbar" appear>
        <v-toolbar dark color="primary" id="navToolbar" app clipped-left pa-0>
            <v-toolbar-side-icon @click="$emit('hamburgerClicked')">
                <slot name="hamburgerHolder"></slot>
            </v-toolbar-side-icon>
            <Logo class></Logo>
            <v-toolbar-title>{{appTitle}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                    class="auto-height py-2 mx-3"
                    color="secondary"
                    round
                    depressed
                    v-on:click="switchTheme()"
                >Switch Theme</v-btn>
                <slot name="default"></slot>
            </v-toolbar-items>
            <v-toolbar-items class="hidden-md-and-up">
                <v-btn icon v-on:click="switchTheme()">
                    <v-icon>invert_colors</v-icon>
                </v-btn>
                <slot name="mobile"></slot>
            </v-toolbar-items>

            <v-toolbar class="primary" flat slot="extension">
                <v-layout>
                    <v-flex xs12>
                        <v-autocomplete
                            light
                            label="Search Products by Name, Vendor or PLU"
                            prepend-inner-icon="search"
                            solo
                        ></v-autocomplete>
                    </v-flex>
                </v-layout>
            </v-toolbar>
        </v-toolbar>
    </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppConfig from "@/AppConfig";
import App from "@/App.vue";
import Logo from "@/components/common/app/Logo.vue";

@Component({
    components: {
        Logo
    }
})
export default class NavToolbar extends Vue {
    private appTitle = AppConfig.title;

    private switchTheme() {
        App.instance.switchTheme();
    }
}
</script>

<style lang="scss">
#navToolbar {
    .v-toolbar__extension {
        padding: 0 !important;
    }
}
</style>


<style lang="scss" scoped>
@import "@/scss/common/constants.scss";

/* Transitions */

.nav-toolbar-enter-active,
.nav-toolbar-leave-active {
    transition: transform 0.5s !important;
}
.nav-toolbar-enter,
.nav-toolbar-leave-to {
    transform: translateY(-100px) !important;
}
</style>
