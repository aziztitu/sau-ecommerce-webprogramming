<template>
    <v-layout column>
        <v-card>
            <v-card-title class="title">Admin Controls</v-card-title>
            <v-divider></v-divider>

            <v-card-text>
                <v-layout row>
                    <router-link v-for="(config, i) in controlConfig" :key="i" :to="config.route">
                        <Tile class="ma-2" :icon="config.icon">{{config.name}}</Tile>
                    </router-link>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-layout>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import Tile from '@/components/common/Tile.vue';

    class AdminControlConfig {
        constructor(public name: string, public icon: string, public route: any = '') {
        }
    }

    @Component({
        components: {
            Placeholder,
            Tile,
        }
    })
    export default class AdminHome extends Vue {

        controlConfig: AdminControlConfig[] = [
            new AdminControlConfig('Users', 'supervised_user_circle', {
                name: 'adminAccounts'
            }),
            new AdminControlConfig('Vendors', 'local_shipping', {
                name: 'adminVendors'
            }),
            new AdminControlConfig('Products', 'fastfood', {
                name: 'adminProducts'
            }),
        ]

        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
</style>
