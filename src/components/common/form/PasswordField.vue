<template>
    <v-text-field
        :label="label"
        :value="value"
        @input="$emit('input', $event)"
        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
        :rules="rules"
        :type="showPassword ? 'text' : 'password'"
        counter
        @click:append="showPassword = !showPassword"
        :error="errorMessages.length > 0"
        :error-messages="errorMessages"
        :disabled="disabled"
    ></v-text-field>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop, Model, Emit } from 'vue-property-decorator';

    @Component
    export default class PasswordField extends Vue {
        @Prop({
            type: String,
            required: true,
        })
        private value!: string;

        @Prop({
            type: String,
            default: 'Password',
        })
        private label!: string;

        @Prop({
            type: Array,
            default: () => [],
        })
        private rules!: any[];

        @Prop(Boolean)
        private disabled!: any[];

        @Prop({
            type: Array,
            default: () => [],
        })
        private errorMessages!: string[];

        private showPassword: boolean = false;
    }
</script>
