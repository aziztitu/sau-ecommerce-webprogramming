<template>
    <v-layout column class="max-height">
        <v-flex>
            <v-card>
                <v-card-title class="pa-0">
                    <v-toolbar color="primary" dark class="flat">
                        <v-toolbar-title>Products</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn icon outline dark>
                                <v-icon>refresh</v-icon>
                            </v-btn>
                            <v-btn icon outline dark @click="productAddDialogModel = true">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <v-card-text class="pa-0">
                    <v-layout row>
                        <v-flex xs12 pa-5>
                            <span class="subheading">Products are not being displayed here yet</span>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <v-dialog v-model="productAddDialogModel" max-width="420">
            <v-card>
                <v-card-title>
                    <span class="headline pt-3 pl-3">Add New Product</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-form>
                            <v-layout wrap>
                                <v-flex xs12>
                                    <v-text-field
                                        v-model="newProductData.name"
                                        label="Product Name*"
                                        required
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field
                                        v-model="newProductData.price"
                                        label="Price*"
                                        type="number"
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field v-model="newProductData.plu" label="PLU*"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <FilePicker label="Product Image"></FilePicker>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select
                                        :items="vendors"
                                        v-model="newProductData.vendorId"
                                        item-text="name"
                                        item-value="_id"
                                        label="Vendor*"
                                    ></v-select>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-checkbox v-model="addAnotherProduct" label="Add another"></v-checkbox>
                    <v-btn flat @click="productAddDialogModel = false">Close</v-btn>
                    <v-btn
                        flat
                        @click="addNewProduct"
                        :loading="isAddingProduct"
                        :disabled="vendors.length === 0"
                    >Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import vendorService from '@/services/api/vendorService';
    import FilePicker from '@/components/common/form/FilePicker.vue';

    class ProductData {
        _id?: string;
        name: string = "";
        price: number = 0;
        plu: string = "";
        imageName: string = "";
        vendorId: string = "";
    }

    @Component({
        components: {
            Placeholder,
            FilePicker
        }
    })
    export default class AdminProducts extends Vue {

        newProductData: ProductData = new ProductData();

        productAddDialogModel = false;
        isAddingProduct = false;
        addAnotherProduct = false;

        vendors: any[] = [];

        mounted() {
            this.refreshVendors();
        }

        async refreshVendors() {
            let resData = await vendorService.getAllVendors();
            if (resData.success) {
                this.vendors = resData.vendors;
            }
        }

        async addNewProduct() {
            console.log(this.newProductData);

        }
    }
</script>

<style lang="scss" scoped>
</style>
