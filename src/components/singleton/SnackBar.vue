<template>
    <v-snackbar
        v-model="showSnackBar"
        :color="snackBarOptions.color"
        :timeout="snackBarOptions.timeout"
        :multi-line="snackBarOptions.multiLine"
    >
        {{snackBarContent}}
        <v-btn icon @click="showSnackBar=false">
            <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script lang="ts">
/* eslint-disable */

import Vue from "vue";
import Component from "vue-class-component";

export class SnackBarOptions {
    public color: string = "";
    public timeout: number = 3000;
    public multiLine: boolean = false;
}

export const SnackBarTypes = {
    Error: {
        color: "red"
    } as SnackBarOptions,
    Success: {
        color: "green"
    } as SnackBarOptions
};

@Component
export default class SnackBar extends Vue {
    public static show(content: string, options?: SnackBarOptions) {
        if (SnackBar.Instance) {
            SnackBar.Instance.show(content, options);
        }
    }

    private static Instance?: SnackBar;

    private showSnackBar = false;
    private snackBarContent = "";
    private snackBarOptions: SnackBarOptions = new SnackBarOptions();

    private created() {
        SnackBar.Instance = this;
    }

    private show(content: string, options?: SnackBarOptions) {
        if (!options) {
            options = new SnackBarOptions();
        }

        this.snackBarContent = content;
        this.snackBarOptions = options;
        this.showSnackBar = true;
    }
}
</script>
