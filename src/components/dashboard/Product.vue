<template>
    <v-card hover style class="product">
        <v-layout row pa-3>
            <v-img
                v-if="value.imageName"
                class="product-img"
                :src="`${apiBaseURL}/static/images/products/${value.imageName}`"
                cover
            ></v-img>
            <Logo :lighter="true" v-else class="product-img pa-5"></Logo>
            <!-- <v-img v-else
                class="product-img"
                :src="`https://www.leeroy.ca/static/src/assets/images/collections/orange-investments.jpg`"
                contain
            ></v-img>-->
            <v-layout column class="product-info" pl-4 justify-start>
                <div v-if="!editingData">
                    <div class="headline mb-3">{{value.name}}</div>
                    <div class="subheading">Price: ${{value.price}}</div>
                    <div class="subheading">PLU: {{value.plu}}</div>
                    <div class="subheading">Vendor: {{vendor?vendor.name:''}}</div>
                </div>
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
            <v-spacer></v-spacer>
            <v-layout v-if="editable" column style="max-width: fit-content">
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
    import SnackBar from '@/components/singleton/SnackBar.vue';
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
        editable!: boolean;

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

        async toggleEditMode() {
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
        }

        async removeProduct() {
            let resData = await productService.removeProduct(this.value._id);
            if (resData.success) {
                this.$emit('onremoved', this.value);
            } else {
                SnackBar.show(resData.message);
            }
        }

        @Emit('input')
        emitAsInput(val: any) {
            return val;
        }
    }
</script>

<style lang="scss" scoped>
    .product {
        // border-radius: 10px;
    }

    .product-img {
        $productImageSize: 200px;
        min-width: $productImageSize;
        max-width: $productImageSize;
        min-height: $productImageSize;
        max-height: $productImageSize;

        &.v-image {
            // border: 0.5px #777 solid;
            border-radius: 20px;
        }
    }

    .product-info {
        text-align: left;
    }
</style>
