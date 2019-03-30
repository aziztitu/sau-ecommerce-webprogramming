<template>
    <v-card hover class="tile" :style="`background-color:${tileColor};`" @click="onClicked" ripple>
        <v-layout column>
            <v-flex :style="`${tileSizeStyle};`">
                <v-icon
                    :color="fontColor"
                    :style="`width: 100%; height: 100%; font-size: ${tileIconSize};`"
                >{{icon}}</v-icon>
            </v-flex>
            <v-divider></v-divider>
            <v-flex pa-2>
                <span :style="`color:${fontColor};`">
                    <slot name="default"></slot>
                </span>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';
    import AppHelper from '@/tools/AppHelper';

    @Component
    export default class Tile extends Vue {
        @Prop({
            default: 'primary'
        })
        color!: string;

        @Prop({
            default: ''
        })
        icon!: string;

        @Prop({
            default: 150
        })
        width!: string | number;

        @Prop({
            default: 150
        })
        height!: string | number;

        @Prop({
            default: 90
        })
        iconSize!: string | number;

        get tileSizeStyle() {
            return AppHelper.getFixedSizeStyle(this.width, this.height);
        }

        get tileIconSize() {
            return AppHelper.getCSSSize(this.iconSize);
        }

        get tileColor() {
            return AppHelper.getAppColor(this.color);
        }

        get fontColor() {
            return AppHelper.isColorDark(this.tileColor) ? 'white' : 'black';
        }

        onClicked() {

        }
    }
</script>

<style lang="scss" scoped>
    .tile {
        cursor: pointer;
    }
</style>
