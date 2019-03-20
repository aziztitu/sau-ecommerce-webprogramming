<template>
    <v-card hover style class="product">
        <v-layout :column="portrait" :row="landscape" pa-3>
            <div :class="`${navigable?'clickable':''}`" @click="navigateToProductDetails">
                <v-img
                    v-if="value.imageName"
                    class="product-img"
                    :src="`${apiBaseURL}/static/images/products/${value.imageName}`"
                    cover
                ></v-img>
                <Logo :lighter="true" v-else class="product-img"></Logo>
            </div>

            <v-layout
                column
                class="product-info"
                :pl-1="portrait"
                :pt-3="portrait"
                :pl-4="landscape"
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
                        :class="`mt-4 mx-0 ${landscape?'fit-width':''}`"
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
            <v-spacer v-if="landscape"></v-spacer>
            <v-layout
                v-if="editable"
                :row="portrait"
                :column="landscape"
                :justify-end="portrait"
                :mt-4="portrait"
                :style="`${landscape?'max-width: fit-content':'min-width: 100%'}`"
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

        get vendors() {
            return dashboardModule.vendors;
        }

        get vendor() {
            return dashboardModule.mapped.vendors[this.value.vendorId];
        }

        get apiBaseURL() {
            return AppConfig.api.baseURL;
        }

        get landscape() {
            return !this.portrait;
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
    }
</script>

<style lang="scss" scoped>
    $productImageSize: 200px;

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

        .product-img {
            min-width: $productImageSize;
            max-width: $productImageSize;
            min-height: $productImageSize;
            max-height: $productImageSize;

            &.v-image {
                // border: 0.5px #777 solid;
                border-radius: 10px;
            }
        }

        .product-info {
            text-align: left;
        }
    }
</style>
