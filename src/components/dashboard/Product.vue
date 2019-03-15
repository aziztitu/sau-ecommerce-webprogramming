<template>
    <v-card hover style="cursor: inherit" class="product">
        <v-layout row pa-3>
            <v-img
                v-if="value.imageName"
                class="product-img"
                :src="`${apiBaseURL}/static/images/products/${value.imageName}`"
                contain
            ></v-img>
            <Logo :lighter="true" v-else class="product-img pa-5"></Logo>
            <!-- <v-img v-else
                class="product-img"
                :src="`https://www.leeroy.ca/static/src/assets/images/collections/orange-investments.jpg`"
                contain
            ></v-img>-->
            <v-layout column class="product-info" pl-4 justify-start>
                <div class="headline mb-3">{{value.name}}</div>
                <div class="subheading">Price: ${{value.price}}</div>
                <div class="subheading">PLU: {{value.plu}}</div>
                <div class="subheading">Vendor: {{value.vendorId}}</div>
            </v-layout>
        </v-layout>
    </v-card>
</template>


<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';
    import AppConfig from '@/AppConfig';
    import Logo from '@/components/common/app/Logo.vue';

    export class ProductData {
        _id?: string;
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

        get apiBaseURL() {
            return AppConfig.api.baseURL;
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
