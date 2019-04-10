<template>
    <v-card
        :hover="hover"
        style
        :class="`product pa-3 ${flat?'flat':''} ${smartPortrait?'portrait':'landscape'} ${mini?'mini':''}`"
        v-resize="onWindowResized"
    >
        <v-layout column>
            <v-layout
                class="product-container"
                :style="`${widthStyle}`"
                :column="smartPortrait"
                :row="smartLandscape"
            >
                <v-layout
                    justify-center
                    align-center
                    :class="`product-img-wrapper ${navigable?'clickable':''}`"
                    @click="navigateToProductDetails"
                >
                    <v-img
                        v-if="value.imageName"
                        class="product-img"
                        :src="`${apiBaseURL}/static/images/products/${value.imageName}`"
                        cover
                    ></v-img>
                    <Logo :lighter="true" v-else class="product-img smaller"></Logo>
                </v-layout>

                <v-layout
                    column
                    class="product-info"
                    :pl-1="smartPortrait"
                    :pt-3="smartPortrait"
                    :pl-4="smartLandscape"
                    :pt-1="smartLandscape && !mini"
                    justify-start
                >
                    <v-layout
                        v-if="!editingData"
                        :row="smartLandscape"
                        :column="smartPortrait"
                        :reverse="smartPortrait"
                    >
                        <v-layout column>
                            <v-layout align-center mb-1 :pt-0="mini" class="fit-height">
                                <div
                                    :class="`product-name ${mini?'subheading':'title'} ${navigable?'clickable':''}`"
                                    @click="navigateToProductDetails"
                                >{{value.name}}</div>
                                <v-spacer></v-spacer>
                            </v-layout>
                            <v-divider v-if="!mini"></v-divider>
                            <v-flex
                                :mt-3="!mini"
                                :mt-1="mini"
                                mb-2
                                :class="`${mini?'subheading':'title'} ${cartControls?'':'fw-600'}`"
                            >${{formatCurrency(value.price)}}</v-flex>
                            <div
                                class="subheading mb-1"
                                v-if="showDescription && !mini"
                            >{{value.description}}</div>
                            <div class="subheading" v-if="!mini">#{{value.plu}}</div>
                            <div class="subheading" v-if="!mini">by {{vendor?vendor.name:''}}</div>

                            <v-layout :justify-center="smartPortrait" :mt-4="!mini" mx-0>
                                <v-layout
                                    :justify-center="smartPortrait"
                                    align-center
                                    v-if="cartCount > 0"
                                >
                                    <v-btn
                                        outline
                                        icon
                                        :small="mini"
                                        color="accent"
                                        :class="`mx-0 mt-0 mb-0`"
                                        @click="removeProductFromCart"
                                        :disabled="isErasingFromCart || isAddingToCart"
                                        :loading="isRemovingFromCart"
                                    >
                                        <v-icon :small="mini">remove</v-icon>
                                    </v-btn>
                                    <span class="mx-3">{{ cartCount }}</span>
                                    <v-btn
                                        outline
                                        icon
                                        :small="mini"
                                        color="accent"
                                        :class="`mx-0 mt-0 mb-0`"
                                        @click="addProductToCart"
                                        :disabled="isErasingFromCart || isRemovingFromCart"
                                        :loading="isAddingToCart"
                                    >
                                        <v-icon :small="mini">add</v-icon>
                                    </v-btn>

                                    <v-btn
                                        v-if="cartControls"
                                        icon
                                        :class="`mr-0 ml-3 mt-0 mb-0`"
                                        @click="eraseFromCart"
                                        :disabled="isAddingToCart || isRemovingFromCart"
                                        :loading="isErasingFromCart"
                                    >
                                        <v-icon color="red">delete</v-icon>
                                    </v-btn>
                                </v-layout>
                                <v-layout :justify-center="smartPortrait" v-else>
                                    <v-btn
                                        raised
                                        color="accent"
                                        :class="`mx-0 mt-0 ${smartLandscape?'fit-width':''}`"
                                        @click="addProductToCart"
                                        :loading="isAddingToCart"
                                    >
                                        <v-icon left>add_shopping_cart</v-icon>
                                        <span class="fw-600">Add to Cart</span>
                                    </v-btn>
                                </v-layout>
                            </v-layout>
                        </v-layout>

                        <v-layout v-if="cartControls" column>
                            <v-layout row justify-end>
                                <span class="headline fw-600">${{formatCurrency(value.price * cartCount)}}</span>
                            </v-layout>
                        </v-layout>
                    </v-layout>
                    <div v-else>
                        <v-layout column>
                            <v-text-field label="Name" v-model="editingData.name"></v-text-field>
                            <v-text-field label="Price" v-model="editingData.price"></v-text-field>
                            <v-text-field label="Description" v-model="editingData.description"></v-text-field>
                            <v-text-field label="PLU" v-model="editingData.plu"></v-text-field>
                            <v-select
                                v-model="editingData.vendorId"
                                :items="vendors"
                                item-text="name"
                                item-value="_id"
                                label="Vendor"
                            ></v-select>
                        </v-layout>
                    </div>
                </v-layout>
                <v-spacer v-if="smartLandscape && editable"></v-spacer>
                <v-layout
                    v-if="editable"
                    :row="smartPortrait"
                    :column="smartLandscape"
                    :justify-end="smartPortrait"
                    :mt-4="smartPortrait"
                    :style="`${smartLandscape?'max-width: fit-content':'min-width: 100%'}`"
                >
                    <v-btn icon outline small @click="toggleEditMode" :loading="isSaving">
                        <v-icon small v-if="!editingData">edit</v-icon>
                        <v-icon small v-else>save</v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        outline
                        small
                        color="red"
                        @click="removeProduct"
                        :loading="isRemoving"
                    >
                        <v-icon small>delete</v-icon>
                    </v-btn>
                </v-layout>
            </v-layout>
            <v-layout>
                <v-layout
                    column
                    v-if="detailed && !editingData && value.detailHTML.length > 0"
                    mt-4
                    px-2
                    align-start
                >
                    <span class="title">Product Details</span>
                    <v-divider class="max-width my-2"></v-divider>
                    <v-flex style="text-align: left" v-html="value.detailHTML" mt-2></v-flex>
                </v-layout>

                <v-layout v-if="editingData" justify-start align-start>
                    <HTMLInputField
                        label="Detail HTML"
                        :livePreview="true"
                        v-model="editingData.detailHTML"
                    ></HTMLInputField>
                </v-layout>
            </v-layout>
        </v-layout>
    </v-card>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop, Emit } from 'vue-property-decorator';
    import AppConfig from '@/AppConfig';
    import Logo from '@/components/common/app/Logo.vue';
    import dashboardModule from '@/store/modules/dashboardModule';
    import lodash from 'lodash';
    import vendorService from '@/services/api/vendorService';
    import SnackBar, { SnackBarTypes, SnackBarOptions } from '@/components/singleton/SnackBar.vue';
    import productService from '@/services/api/productService';
    import App from '@/App.vue';
    import HTMLInputField from '@/components/common/form/HTMLInputField.vue';
    import { ProductData } from '@/tools/types/api';
    import cartModule from '@/store/modules/cartModule';
    import AppHelper from '@/tools/AppHelper';

    @Component({
        components: {
            Logo,
            HTMLInputField
        }
    })
    export default class Product extends Vue {
        @Prop({
            required: true,
        })
        value!: ProductData;

        @Prop({
            default: false,
        })
        portrait!: boolean;

        @Prop({
            default: null
        })
        width!: string | null;

        @Prop({
            default: false,
        })
        disableMobileView!: boolean;

        @Prop({
            default: false,
        })
        editable!: boolean;

        @Prop({
            default: true,
        })
        navigable!: boolean;

        @Prop({
            default: true,
        })
        showDescription!: boolean;

        @Prop({
            default: false,
        })
        detailed!: boolean;

        @Prop({
            default: false,
        })
        mini!: boolean;

        @Prop({
            default: false,
        })
        cartControls!: boolean;

        @Prop({
            default: true,
        })
        hover!: boolean;

        @Prop({
            default: false,
        })
        flat!: boolean;

        isSaving = false;
        isRemoving = false;
        isAddingToCart = false;
        isRemovingFromCart = false;
        isErasingFromCart = false;

        editingData: ProductData | null = null;

        mobileBreakPoint = 500;
        mobileView = false;

        get vendors() {
            return dashboardModule.vendors;
        }

        get vendor() {
            return dashboardModule.mapped.vendors[this.value.vendorId];
        }

        get cartModule() {
            return cartModule;
        }

        get cartCount() {
            let count = 0;
            cartModule.cartData.cartItems.forEach(cartItem => {
                if (cartItem.product == this.value._id) {
                    count = cartItem.count;
                }
            });

            return count;
        }

        get apiBaseURL() {
            return AppConfig.api.baseURL;
        }

        get smartPortrait() {
            return this.portrait || this.mobileView;
        }

        get smartLandscape() {
            return !this.smartPortrait;
        }

        get widthStyle() {
            if (this.width) {
                return `min-width:${this.width}; max-width:${this.width};`;
            } else {
                if (this.mobileView && !this.portrait) {
                    return `min-width:100%; max-width:100%;`;
                }
            }
        }

        async mounted() {

        }

        async toggleEditMode(e: Event) {

            e.preventDefault();
            e.stopImmediatePropagation();

            if (this.editingData) {
                this.isSaving = true;

                let resData = await productService.updateProduct(this.editingData._id!, this.editingData);

                if (resData.success) {
                    this.emitAsInput(this.editingData);
                    this.editingData = null;
                } else {
                    SnackBar.show(resData.message);
                    console.log(resData);
                }
                this.isSaving = false;
            } else {
                this.editingData = lodash.cloneDeep(this.value);
            }

            return false;
        }

        async removeProduct(e: Event) {

            e.preventDefault();
            e.stopImmediatePropagation();

            this.isRemoving = true;
            let resData = await productService.removeProduct(this.value._id);
            this.isRemoving = false;

            if (resData.success) {
                this.$emit('onremoved', this.value);
            } else {
                SnackBar.show(resData.message);
            }

            return false;
        }

        @Emit('input')
        emitAsInput(val: any) {
            return val;
        }

        navigateToProductDetails() {
            if (this.navigable) {
                this.$router.push({
                    name: 'productDetails',
                    params: {
                        productId: this.value._id,
                    },
                });
            }
        }

        formatCurrency(value: number) {
            return AppHelper.formatCurrency(value);
        }

        async addProductToCart() {
            this.isAddingToCart = true;
            let res = await cartModule.addToCart({
                productId: this.value._id,
                count: 1,
            });
            this.isAddingToCart = false;
            if (res.data.success) {
                SnackBar.show('Item added to cart');
            } else {
                SnackBar.show(res.data.message, SnackBarTypes.Error);
            }
        }

        async removeProductFromCart() {
            this.isRemovingFromCart = true;
            let res = await cartModule.removeFromCart({
                productId: this.value._id,
                count: 1,
            });
            this.isRemovingFromCart = false;
            if (res.data.success) {
                SnackBar.show('Item removed from cart');
            } else {
                SnackBar.show(res.data.message, SnackBarTypes.Error);
            }
        }

        async eraseFromCart() {
            this.isErasingFromCart = true;
            let res = await cartModule.eraseFromCart(this.value._id);
            this.isErasingFromCart = false;
            if (res.data.success) {
                SnackBar.show('Item deleted from cart');
            } else {
                SnackBar.show(res.data.message, SnackBarTypes.Error);
            }
        }

        private onWindowResized() {
            if (!this.disableMobileView) {
                const wasOnMobile = this.mobileView;
                this.mobileView = window.innerWidth < this.mobileBreakPoint;
            }
        }
    }
</script>

<style lang="scss" scoped>
    $productImageSize: 200px;
    $productImageSmallerSize: 150px;
    $productImageMiniSize: 100px;
    $productImageMiniSmallerSize: 80px;

    .product {
        // border-radius: 10px;
        max-height: fit-content;
        cursor: inherit;

        .product-name {
            font-weight: 500;
        }

        .product-img-wrapper {
            min-width: $productImageSize;
            max-width: $productImageSize;
            min-height: $productImageSize;
            max-height: $productImageSize;

            .product-img {
                min-width: $productImageSize;
                max-width: $productImageSize;
                min-height: $productImageSize;
                max-height: $productImageSize;

                &.v-image {
                    // border: 0.5px #777 solid;
                    border-radius: 10px;
                }

                &.smaller {
                    min-width: $productImageSmallerSize;
                    max-width: $productImageSmallerSize;
                    min-height: $productImageSmallerSize;
                    max-height: $productImageSmallerSize;
                }
            }
        }

        .product-info {
            text-align: left;
        }

        &.portrait {
            $productContainerWidth: 200px;

            .product-container {
                min-width: $productContainerWidth;
                max-width: $productContainerWidth;

                .product-img-wrapper {
                    min-width: 100%;
                    max-width: 100%;
                }

                .product-name {
                    height: 28px;
                    // white-space: nowrap;
                    text-overflow: ellipsis;
                    // width: $productImageSize;
                    display: block;
                    overflow: hidden;
                }
            }
        }

        &.mini {
            .product-img-wrapper {
                min-width: $productImageMiniSize;
                max-width: $productImageMiniSize;
                min-height: $productImageMiniSize;
                max-height: $productImageMiniSize;

                .product-img {
                    min-width: $productImageMiniSize;
                    max-width: $productImageMiniSize;
                    min-height: $productImageMiniSize;
                    max-height: $productImageMiniSize;

                    &.smaller {
                        min-width: $productImageMiniSmallerSize;
                        max-width: $productImageMiniSmallerSize;
                        min-height: $productImageMiniSmallerSize;
                        max-height: $productImageMiniSmallerSize;
                    }
                }
            }
        }
    }
</style>
