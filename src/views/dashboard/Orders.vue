<template>
    <v-card>
        <v-toolbar color="primary" dark>
            <v-toolbar-title>My Orders</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear
            indeterminate
            v-show="loadingOrders"
            class="ma-0"
            height="5"
            color="secondary"
        ></v-progress-linear>
        <v-card-text>
            <v-layout column>
                <v-flex v-for="(order, i) in orders" :key="i" my-2>
                    <v-card flat class="bordered">
                        <v-card-title class="title">Order {{i+1}}</v-card-title>
                        <v-card-text>
                            <v-layout column>
                                <v-flex v-for="(orderItem, j) in order.orderItems" :key="j">
                                    <Product
                                        v-model="productData[orderItem.product]"
                                        :hover="false"
                                        :flat="true"
                                        :mini="true"
                                        :overridePrice="orderItem.price"
                                        :viewMode="true"
                                        :quantity="orderItem.qty"
                                    ></Product>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import accountService from '../../services/api/accountService';
    import SnackBar, { SnackBarTypes } from '../../components/singleton/SnackBar.vue';
    import { ProductData, OrderData } from '../../tools/types/api/index';
    import productService from '../../services/api/productService';
    import Product from '../../components/dashboard/Product.vue';


    @Component({
        components: {
            Placeholder,
            Product,
        }
    })
    export default class Orders extends Vue {
        loadingOrders = false;
        orders: OrderData[] = [];

        productData: { [key: string]: ProductData } = {};

        mounted() {
            this.refreshOrders();
        }

        async refreshOrders() {
            this.loadingOrders = true;
            let resData = await accountService.getOrders('me');
            if (resData.success) {
                let productIdsFound: { [key: string]: boolean } = {};
                (resData.orders as OrderData[]).forEach(order => {
                    order.orderItems.forEach(orderItem => {
                        console.log(orderItem);

                        productIdsFound[orderItem.product] = true;
                    });
                });

                let requiredProductIds = Object.keys(productIdsFound);
                console.log(productIdsFound);


                let productsResData = await productService.getMultipleProducts(requiredProductIds);
                if (productsResData.success) {
                    (productsResData.products as ProductData[]).forEach(product => {
                        this.productData[product._id] = product;
                    });

                    this.orders = resData.orders;
                } else {
                    SnackBar.show(productsResData.message, SnackBarTypes.Error);
                }
            } else {
                SnackBar.show(resData.message, SnackBarTypes.Error);
            }

            this.loadingOrders = false;
        }
    }
</script>

<style lang="scss" scoped>
</style>
