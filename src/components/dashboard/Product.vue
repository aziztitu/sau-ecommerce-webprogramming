<template>
    <v-card
        hover
        style
        :class="`product ${usePortrait?'portrait':'landscape'}`"
        v-resize="onWindowResized"
    >
        <v-layout
            class="product-container"
            :style="`${widthStyle}`"
            :column="usePortrait"
            :row="useLandscape"
            pa-3
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
                :pl-1="usePortrait"
                :pt-3="usePortrait"
                :pl-4="useLandscape"
                justify-start
            >
                <v-layout column v-if="!editingData">
                    <v-layout align-center mb-1 class="fit-height">
                        <div
                            :class="`product-name subheading ${navigable?'clickable':''}`"
                            @click="navigateToProductDetails"
                        >{{value.name}}</div>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <v-divider></v-divider>
                    <div class="title mt-3 mb-2">${{value.price}}</div>
                    <div class="subheading">#{{value.plu}}</div>
                    <div class="subheading">by {{vendor?vendor.name:''}}</div>

                    <v-btn
                        raised
                        color="accent"
                        :class="`mt-4 mx-0 ${useLandscape?'fit-width':''}`"
                        @click="addProductToCart"
                    >
                        <v-icon left>add_shopping_cart</v-icon>
                        <span>Add to Cart</span>
                    </v-btn>
                </v-layout>
                <div v-else>
                    <v-layout column>
                        <v-text-field label="Name" v-model="editingData.name"></v-text-field>
                        <v-text-field label="Price" v-model="editingData.price"></v-text-field>
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
            <v-spacer v-if="useLandscape"></v-spacer>
            <v-layout
                v-if="editable"
                :row="usePortrait"
                :column="useLandscape"
                :justify-end="usePortrait"
                :mt-4="usePortrait"
                :style="`${useLandscape?'max-width: fit-content':'min-width: 100%'}`"
            >
                <v-btn icon outline small @click="toggleEditMode" :loading="isSaving">
                    <v-icon small v-if="!editingData">edit</v-icon>
                    <v-icon small v-else>save</v-icon>
                </v-btn>
                <v-btn icon outline small color="red" @click="removeProduct" :loading="isRemoving">
                    <v-icon small>delete</v-icon>
                </v-btn>
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
    import SnackBar, { SnackBarTypes } from '@/components/singleton/SnackBar.vue';
    import productService from '@/services/api/productService';
    import App from '@/App.vue';

    export class ProductData {
        _id: string = "";
        name: string = "";
        price: number = 0;
        plu: string = "";
        imageFile: File | null = null;
        vendorId: string = "";
    }

    @Component({
        components: {
            Logo,
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
            default: false,
        })
        detailed!: boolean;

        isSaving = false;
        isRemoving = false;

        editingData: ProductData | null = null;

        mobileBreakPoint = 500;
        mobileView = false;

        get vendors() {
            return dashboardModule.vendors;
        }

        get vendor() {
            return dashboardModule.mapped.vendors[this.value.vendorId];
        }

        get apiBaseURL() {
            return AppConfig.api.baseURL;
        }

        get usePortrait() {
            return this.portrait || this.mobileView;
        }

        get useLandscape() {
            return !this.usePortrait;
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

        mounted() {

        }

        async toggleEditMode(e: Event) {

            e.preventDefault();
            e.stopImmediatePropagation();

            if (this.editingData) {
                this.isSaving = true;

                let { name, price, plu, vendorId, imageFile } = this.editingData;

                let resData = await productService.updateProduct(this.editingData._id!, {
                    name,
                    price,
                    plu,
                    vendorId
                });

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

        addProductToCart() {
            SnackBar.show('Coming Soon...', SnackBarTypes.Success);
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

    .product {
        // border-radius: 10px;
        max-height: fit-content;
        cursor: inherit;

        .product-name {
            font-weight: 500;
            // white-space: nowrap;
            text-overflow: ellipsis;
            // width: $productImageSize;
            height: 28px;
            display: block;
            overflow: hidden;
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
            }
        }
    }
</style>
