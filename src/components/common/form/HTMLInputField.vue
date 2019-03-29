<template>
    <v-layout row wrap>
        <v-flex xs12 :md6="!previewBelow" v-show="livePreview || !previewMode" pa-2>
            <v-textarea
                :value="value"
                v-bind="$attrs"
                v-on="listeners"
                :append-icon="livePreview?'':'visibility'"
                @click:append="previewMode = true;"
            ></v-textarea>
        </v-flex>
        <v-flex xs12 :md6="!previewBelow" column v-show="livePreview || previewMode" justify-start pa-2>
            <div class="max-width">
                <v-layout justify-space-between pt-1>
                    <span>{{$attrs.label || ''}} (Preview)</span>
                    <v-icon
                        v-if="!livePreview"
                        class="pt-3"
                        @click="previewMode=false"
                    >visibility_off</v-icon>
                </v-layout>
            </div>
            <div>
                <v-flex mt-1 style="text-align: left; max-width: 100%;" v-html="htmlString.length > 0?htmlString:'<i>None</i>'"></v-flex>
            </div>
        </v-flex>
    </v-layout>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop, Model, Emit } from 'vue-property-decorator';

    @Component({
        inheritAttrs: false,
    })
    export default class HTMLInputField extends Vue {
        @Prop({
            default: ""
        })
        value!: string;

        @Prop({
            default: true,
        })
        livePreview!: boolean;

        @Prop({
            default: false,
        })
        previewBelow!: boolean;

        htmlString = this.value;
        previewMode = false;

        get listeners() {
            return {
                ...this.$listeners,
                ...{
                    input: ($event: any) => {
                        this.htmlString = $event;
                        this.$emit('input', $event)
                    }
                }
            }
        }
    }
</script>
