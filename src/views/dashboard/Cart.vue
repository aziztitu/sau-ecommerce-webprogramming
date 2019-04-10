<template>
    <v-card>
        <v-card-title class="pa-0">
            <v-toolbar color="primary" dark>
                <v-toolbar-title>Cart</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        class="auto-height py-2"
                        :disabled="cartProducts.length==0 || authModule.accountData==null"
                        light
                        round
                        @click="checkout"
                    >
                        Checkout
                        <v-icon right color="primary">send</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-progress-linear
                class="ma-0"
                background-color="primary"
                color="white"
                height="3px"
                indeterminate
                v-if="loadingCartProducts"
            ></v-progress-linear>
            <v-layout
                column
                align-end
                class="title"
                :style="`background-color: ${$vuetify.theme.secondary}; color: white;`"
                py-3
                px-4
            >Subtotal: ${{formatCurrency(subTotal)}}</v-layout>
        </v-card-title>
        <v-card-text>
            <v-layout column>
                <v-flex v-for="(cartProduct, i) in cartProducts" :key="i" py-1>
                    <Product
                        v-model="cartProducts[i]"
                        :hover="false"
                        :flat="true"
                        :loadProductOnStart="true"
                        :mini="true"
                        :cartControls="true"
                    ></Product>
                    <v-divider></v-divider>
                </v-flex>

                <v-flex v-if="cartProducts.length == 0" pa-3>No products found in your cart</v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import authModule from '@/store/modules/authModule';
    import cartModule from '@/store/modules/cartModule';
    import Product from '@/components/dashboard/Product.vue';
    import { ProductData } from '@/tools/types/api';
    import productService from '@/services/api/productService';
    import AppHelper from '@/tools/AppHelper';
    import SnackBar from '@/components/singleton/SnackBar.vue';

    @Component({
        components: {
            Placeholder,
            Product,
        }
    })
    export default class Cart extends Vue {
        get authModule() {
            return authModule;
        }

        get cartModule() {
            return cartModule;
        }

        get subTotal() {
            let subTotal = 0;
            this.cartProducts.forEach(cartProduct => {
                let count = 0;
                cartModule.cartData.cartItems.forEach((cartItem) => {
                    if (cartItem.product == cartProduct._id) {
                        count = cartItem.count;
                    }
                });

                subTotal += cartProduct.price * count;
            });

            return subTotal;
        }

        cartProducts: ProductData[] = [];

        loadingCartProducts = false;

        async mounted() {
            await cartModule.refreshCartData();
            this.refreshCartProducts();
        }

        async refreshCartProducts() {
            this.loadingCartProducts = true;
            const res = await productService.getMultipleProducts(cartModule.cartData.cartItems.map(cartItem => cartItem.product));
            this.loadingCartProducts = false;
            if (res.success) {
                this.cartProducts = res.products;
            }
        }

        formatCurrency(value: number) {
            return AppHelper.formatCurrency(value);
        }

        checkout() {
            SnackBar.show('Coming Soon');
        }
    }
</script>


<style lang="scss" scoped>
</style>

