<template>
    <v-flex>
        <input
            type="file"
            id="fileInput"
            ref="fileInput"
            :multiple="multiple"
            @change="onFileInputChanged"
        >
        <label for="fileInput">
            <div>
                <v-input class="filePicker" ref="filePicker">
                    <v-layout class="pa-3" justify-center>
                        <v-flex
                            v-if="!filesPicked || filesPicked.length === 0"
                            class="center-text"
                        >No Files Selected</v-flex>
                        <v-layout row v-else align-center>
                            <v-flex
                                v-if="filesPicked.length === 1"
                                class="center-text"
                                style="overflow: hidden; text-overflow: ellipsis;"
                            >{{filesPicked[0].name}}</v-flex>
                            <v-flex v-else class="center-text">{{filesPicked.length}} files selected</v-flex>

                            <v-btn icon @click="clearFileInput">
                                <v-icon>clear</v-icon>
                            </v-btn>
                        </v-layout>
                    </v-layout>
                </v-input>
            </div>
        </label>
    </v-flex>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop, Emit } from 'vue-property-decorator';

    @Component
    export default class FilePicker extends Vue {
        @Prop({
            type: Boolean,
            required: false,
            default: false,
        })
        multiple = false;

        @Prop({
            type: String,
            required: true,
        })
        label!: string;

        filesPicked: FileList = this.emptyFileList;

        get emptyFileList() {
            let emptyFileInput = document.createElement('input');
            emptyFileInput.type = 'file';

            return emptyFileInput.files as FileList;
        }

        get files() {
            return this.filesPicked;
        }

        mounted() {
            console.log((this.$refs.filePicker as any));
        }

        @Emit('onFilesUpdated')
        onFileInputChanged(e: Event) {
            this.filesPicked = (this.$refs.fileInput as any).files;
            console.log(this.filesPicked);

            return this.filesPicked;
        }

        public clearFileInput() {
            (this.$refs.fileInput as any).files = this.emptyFileList;
        }
    }
</script>

<style lang="scss" scoped>
    input[type="file"] {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;

        &:focus + .filePicker {
            border-color: cyan;
        }
    }

    .filePicker {
        border: dashed 2px;
        cursor: pointer;

        /deep/ .v-input__slot {
            margin-bottom: 0;
        }

        /deep/ .v-messages {
            display: none !important;
        }
    }
</style>
