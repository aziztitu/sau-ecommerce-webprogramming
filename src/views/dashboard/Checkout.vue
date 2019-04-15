<template>
    <v-card>
        <v-card-title class="pa-0">
            <v-toolbar color="primary" dark>
                <v-toolbar-title>Checkout</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items></v-toolbar-items>
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
        <v-card-text class="px-2">
            <v-stepper v-model="checkoutStep" vertical class="no-shadow">
                <v-stepper-step :complete="checkoutStep > 1" step="1" :editable="checkoutStep > 1">
                    Order Type
                    <small>Pickup or Delivery</small>
                </v-stepper-step>
                <v-stepper-content step="1">
                    <v-layout column>
                        <v-radio-group v-model="orderType">
                            <v-radio label="Pickup" color="primary" :value="0"></v-radio>
                            <v-radio label="Delivery" color="primary" :value="1"></v-radio>
                        </v-radio-group>

                        <v-layout row>
                            <v-btn color="primary" @click="checkoutStep++">Continue</v-btn>
                            <!-- <v-btn flat>Cancel</v-btn> -->
                        </v-layout>
                    </v-layout>
                </v-stepper-content>

                <v-stepper-step
                    :editable="checkoutStep > 2"
                    :complete="checkoutStep > 2"
                    step="2"
                    v-if="orderType == 0"
                >Pickup Details</v-stepper-step>
                <v-stepper-content step="2" v-if="orderType == 0">
                    <v-layout column>
                        <v-menu
                            ref="pickupDateMenu"
                            v-model="pickupDateMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="pickupDate"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <template slot="activator" slot-scope="slot">
                                <v-text-field
                                    v-model="pickupDate"
                                    label="Pickup Date"
                                    prepend-icon="event"
                                    readonly
                                    v-on="slot.on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="pickupDate">
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="pickupDateMenu = false">Cancel</v-btn>
                                <v-btn
                                    flat
                                    color="primary"
                                    @click="$refs.pickupDateMenu.save(pickupDate)"
                                >OK</v-btn>
                            </v-date-picker>
                        </v-menu>

                        <v-menu
                            ref="pickupTimeMenu"
                            v-model="pickupTimeMenu"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="pickupTime"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            min-width="290px"
                        >
                            <template slot="activator" slot-scope="slot">
                                <v-text-field
                                    v-model="pickupTime"
                                    label="Pickup Time"
                                    prepend-icon="access_time"
                                    readonly
                                    v-on="slot.on"
                                ></v-text-field>
                            </template>
                            <v-time-picker v-model="pickupTime">
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="pickupTimeMenu = false">Cancel</v-btn>
                                <v-btn
                                    flat
                                    color="primary"
                                    @click="$refs.pickupTimeMenu.save(pickupTime)"
                                >OK</v-btn>
                            </v-time-picker>
                        </v-menu>

                        <v-layout row>
                            <v-btn color="primary" @click="checkoutStep++">Continue</v-btn>
                            <v-btn flat @click="checkoutStep--">Cancel</v-btn>
                        </v-layout>
                    </v-layout>
                </v-stepper-content>

                <v-stepper-step
                    :editable="checkoutStep > 2"
                    :complete="checkoutStep > 2"
                    step="2"
                    v-if="orderType == 1"
                >Delivery Details</v-stepper-step>
                <v-stepper-content step="2" v-if="orderType == 1">
                    <v-layout column>
                        <v-text-field label="Street" v-model="deliveryStreet"></v-text-field>
                        <v-text-field label="City" v-model="deliveryCity"></v-text-field>
                        <v-text-field label="State" v-model="deliveryState"></v-text-field>
                        <v-text-field label="Zip Code" v-model="deliveryZip"></v-text-field>
                        <v-layout row>
                            <v-btn color="primary" @click="checkoutStep++">Continue</v-btn>
                            <v-btn flat @click="checkoutStep--">Cancel</v-btn>
                        </v-layout>
                    </v-layout>
                </v-stepper-content>

                <v-stepper-step
                    :editable="checkoutStep > 3"
                    :complete="checkoutStep > 3"
                    step="3"
                >Billing</v-stepper-step>
                <v-stepper-content step="3">
                    <v-layout column>
                        <v-text-field label="Credit / Debit Card" v-model="billingCardNum"></v-text-field>
                        <v-text-field label="CVV" v-model="billingCVV"></v-text-field>

                        <v-layout column align-start mt-3>
                            <span class="subheading fw-600">Billing Address</span>
                        </v-layout>
                        <v-text-field label="Street" v-model="billingStreet"></v-text-field>
                        <v-text-field label="City" v-model="billingCity"></v-text-field>
                        <v-text-field label="State" v-model="billingState"></v-text-field>
                        <v-text-field label="Zip Code" v-model="billingZip"></v-text-field>

                        <v-layout row>
                            <v-btn color="primary" @click="checkoutStep++">Continue</v-btn>
                            <v-btn flat @click="checkoutStep--">Cancel</v-btn>
                        </v-layout>
                    </v-layout>
                </v-stepper-content>

                <v-stepper-step
                    :editable="checkoutStep > 4"
                    :complete="checkoutStep > 4"
                    step="4"
                >Review & Place Order</v-stepper-step>
                <v-stepper-content step="4">
                    <v-layout column>
                        <v-layout wrap>
                            <v-flex v-if="orderType == 0" xs12 md6 pa-2 pt-3>
                                <v-layout column align-start>
                                    <span class="subheading fw-600">Pickup Details</span>
                                    <v-divider class="max-width"></v-divider>
                                    <span>Date: {{pickupDate}}</span>
                                    <span>Time: {{pickupTime}}</span>
                                </v-layout>
                            </v-flex>

                            <v-flex v-if="orderType == 1" xs12 md6 pa-2 pt-3>
                                <v-layout column align-start>
                                    <span class="subheading fw-600">Delivery Details</span>
                                    <v-divider class="max-width"></v-divider>
                                    <span>Street: {{deliveryStreet}}</span>
                                    <span>City: {{deliveryCity}}</span>
                                    <span>State: {{deliveryState}}</span>
                                    <span>Zip Code: {{deliveryZip}}</span>
                                </v-layout>
                            </v-flex>

                            <v-flex xs12 md6 pa-2 pt-3>
                                <v-layout column align-start>
                                    <span class="subheading fw-600">Billing Details</span>
                                    <v-divider class="max-width"></v-divider>
                                    <span>Credit/Debit Card Number: {{billingCardNum}}</span>
                                    <span>CVV: {{billingCVV}}</span>
                                    <span>Street: {{billingStreet}}</span>
                                    <span>City: {{billingCity}}</span>
                                    <span>State: {{billingState}}</span>
                                    <span>Zip Code: {{billingZip}}</span>
                                </v-layout>
                            </v-flex>
                        </v-layout>

                        <v-layout column align-end pa-2 mt-4>
                            <span class="subheading">Subtotal: ${{formatCurrency(subTotal)}}</span>
                            <span class="subheading">Tax: ${{formatCurrency(tax)}}</span>
                            <span
                                v-if="orderType == 1"
                                class="subheading"
                            >Delivery Charge: ${{formatCurrency(deliveryCharge)}}</span>
                            <v-divider class="max-width mt-2"></v-divider>
                            <span class="title fw-600 mt-2">Total: ${{formatCurrency(total)}}</span>
                        </v-layout>

                        <v-layout row mt-4 justify-start reverse>
                            <v-btn color="primary" @click="placeOrder">
                                <span class="fw-600">Place Order</span>
                            </v-btn>
                            <v-btn flat @click="checkoutStep--">Cancel</v-btn>
                        </v-layout>
                    </v-layout>
                </v-stepper-content>
            </v-stepper>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    import moment from 'moment';
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import cartModule from '@/store/modules/cartModule';
    import { ProductData } from '@/tools/types/api';
    import productService from '@/services/api/productService';
    import AppHelper from '@/tools/AppHelper';
    import authModule from '@/store/modules/authModule';

    @Component({
        components: {
            Placeholder,
        }
    })
    export default class Checkout extends Vue {
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

        get tax() {
            return 0.08 * this.subTotal;
        }

        get total() {
            return this.subTotal + this.tax + (this.orderType == 1 ? this.deliveryCharge : 0);
        }

        cartProducts: ProductData[] = [];
        deliveryCharge = 3;

        loadingCartProducts = false;

        checkoutStep = 1;

        orderType: 0 | 1 = 0;

        pickupDateMenu = false;
        pickupDate = new Date().toISOString().substr(0, 10);

        pickupTimeMenu = false;
        pickupTime = new Date().toISOString().substr(11, 5);

        deliveryStreet = "";
        deliveryCity = "";
        deliveryState = "";
        deliveryZip = "";

        billingCardNum = "";
        billingCVV = "";
        billingStreet = "";
        billingCity = "";
        billingState = "";
        billingZip = "";

        async mounted() {
            if (authModule.accountData == null) {
                this.$router.push({
                    name: 'home',
                });
                return;
            }

            this.loadingCartProducts = true;
            await cartModule.refreshCartData();
            this.loadingCartProducts = false;

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

        placeOrder() {

        }
    }
</script>


<style lang="scss" scoped>
</style>

