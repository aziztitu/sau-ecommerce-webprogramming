<template>
    <v-flex class="max-height">
        <v-layout column>
            <v-flex>
                <v-card>
                    <!-- <v-card-title></v-card-title> -->
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md4 class="price-range">
                                <v-layout row>
                                    <span class="subheading">Price Range</span>
                                </v-layout>
                                <v-layout row px-2>
                                    <v-range-slider
                                        v-model="searchResultOptions.priceRange"
                                        :min="minPrice"
                                        :max="maxPrice"
                                        class="mt-2"
                                        disabled
                                    ></v-range-slider>
                                </v-layout>
                                <v-layout row justify-space-between px-1>
                                    <v-text-field
                                        label
                                        prefix="$"
                                        v-model="searchResultOptions.priceRange[0]"
                                        disabled
                                    ></v-text-field>
                                    <v-text-field
                                        label
                                        prefix="$"
                                        v-model="searchResultOptions.priceRange[1]"
                                        disabled
                                    ></v-text-field>
                                    <!-- <span>${{searchResultOptions.priceRange[1]}}</span> -->
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-flex>
                <v-layout column mt-3>
                    <v-progress-linear
                        v-if="isLoadingProducts"
                        indeterminate
                        height="3"
                        color="secondary"
                        class="mt-0"
                    ></v-progress-linear>
                    <Product v-for="(product, i) in products" :key="i" v-model="products[i]" class="my-1"></Product>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import productService, { ProductData } from '@/services/api/productService';
    import Product from '@/components/dashboard/Product.vue';

    @Component({
        components: {
            Placeholder,
            Product,
        }
    })
    export default class Shop extends Vue {
        readonly minPrice = 0;
        readonly maxPrice = 1000;

        searchResultOptions = {
            priceRange: [this.minPrice, this.maxPrice]
        }

        isLoadingProducts: boolean = false;
        products: ProductData[] = [];

        mounted() {
            this.refreshFeaturedProducts();
        }

        async refreshFeaturedProducts() {
            this.isLoadingProducts = true;
            let resData = await productService.getAllProducts();
            this.isLoadingProducts = false;

            if (resData.success) {
                this.products = resData.products;
            }
        }
    }
</script>


<style lang="scss" scoped>
    .price-range {
        .v-input--range-slider {
            max-height: 26px;
        }

        .v-text-field {
            max-width: 50px;
            margin-top: 0;
            padding-top: 0;
            max-height: 36px;
        }
    }
</style>

