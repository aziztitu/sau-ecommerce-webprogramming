<template>
    <v-layout column>
        <v-flex xs12 v-if="loadingProductDetails">
            <v-progress-linear indeterminate color="primary" height="3"></v-progress-linear>
        </v-flex>

        <Product v-if="product" v-model="product" :detailed="true" :navigable="false"></Product>
        <v-card v-else-if="!loadingProductDetails">
            <v-card-title class="subheading">Product Not Found</v-card-title>
        </v-card>
    </v-layout>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Product from '@/components/dashboard/Product.vue';
    import productService from '@/services/api/productService';
    import SnackBar from '@/components/singleton/SnackBar.vue';
    import { ProductData } from '@/tools/types/api';

    @Component({
        components: {
            Product,
        }
    })
    export default class ProductDetails extends Vue {

        loadingProductDetails = false;

        product: ProductData | null = null;

        get productIdFromRoute() {
            return this.$route.params.productId;
        }

        mounted() {
            this.refreshProductDetails();
        }

        async refreshProductDetails() {
            this.loadingProductDetails = true;
            let resData = await productService.getProductDetails(this.productIdFromRoute);
            this.loadingProductDetails = false;

            if (resData.success) {
                this.product = resData.productDetails.product;
            } else {
                SnackBar.show(resData.message);
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
