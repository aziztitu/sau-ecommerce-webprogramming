<template>
    <v-layout column class="max-height">
        <v-flex>
            <v-card>
                <v-card-title class="pa-0">
                    <v-toolbar color="primary" dark class="flat">
                        <v-toolbar-title>Products</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn
                                icon
                                outline
                                dark
                                @click="refreshProducts"
                                :loading="isLoadingProducts"
                            >
                                <v-icon>refresh</v-icon>
                            </v-btn>
                            <v-btn icon outline dark @click="productAddDialogModel = true">
                                <v-icon>add</v-icon>
                            </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                </v-card-title>
                <v-card-text class="pa-0">
                    <v-layout column v-if="products.length > 0" py-2>
                        <v-flex my-2 mx-3 xs12 v-for="(product, i) in products" :key="i">
                            <Product :value="product"></Product>
                        </v-flex>
                    </v-layout>
                    <v-layout row v-else>
                        <v-flex xs12 pa-5>No Products available</v-flex>
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
                                    <FilePicker
                                        ref="productImagePicker"
                                        label="Product Image"
                                        @onFilesUpdated="(files) => {newProductData.imageFile = (files && files.length > 0) ? files[0] : null}"
                                    ></FilePicker>
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
                    <v-btn
                        flat
                        @click="productAddDialogModel = false"
                        :disabled="isAddingProduct"
                    >Close</v-btn>
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
    import productService from '@/services/api/productService';
    import FilePicker from '@/components/common/form/FilePicker.vue';
    import AppConfig from '@/AppConfig';
    import Product, { ProductData } from '@/components/dashboard/Product.vue';


    @Component({
        components: {
            Placeholder,
            FilePicker,
            Product
        }
    })
    export default class AdminProducts extends Vue {

        newProductData: ProductData = new ProductData();

        productAddDialogModel = false;
        isLoadingProducts = false;
        isAddingProduct = false;
        addAnotherProduct = false;

        vendors: any[] = [];
        products: any[] = [];

        get apiBaseURL() {
            return AppConfig.api.baseURL;
        }

        mounted() {
            this.refreshVendors();
            this.refreshProducts();
        }

        async refreshVendors() {
            let resData = await vendorService.getAllVendors();
            if (resData.success) {
                this.vendors = resData.vendors;
            }
        }

        async refreshProducts() {
            this.isLoadingProducts = true;
            let resData = await productService.getAllProducts();
            this.isLoadingProducts = false;

            if (resData.success) {
                console.log(resData);

                this.products = resData.products;
            }
        }

        async addNewProduct() {
            console.log(this.newProductData);

            let formData = new FormData();
            if (this.newProductData.imageFile) {
                formData.append('imageFile', this.newProductData.imageFile);
            }

            let { name, price, plu, vendorId } = this.newProductData;

            formData.append('_default', JSON.stringify({
                name,
                price,
                plu,
                vendorId
            }));

            let resData = await productService.addNewProduct(formData);
            console.log(resData);

            if (resData.success) {

                if (this.addAnotherProduct) {
                    this.newProductData.name = '';
                    this.newProductData.price = 0;
                } else {
                    this.newProductData = new ProductData();
                    (this.$refs.productImagePicker as FilePicker).clearFileInput();
                    this.productAddDialogModel = false;
                }

                this.refreshProducts();
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
