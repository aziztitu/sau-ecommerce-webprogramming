<template>
    <v-layout column v-resize="onWindowResized">
        <v-flex class="" :style="`font-size: ${isOnMobile?'20':'22'}px`" mb-4>
            Welcome to
            <b>{{appTitle}}</b>. Shop for the lowest prices at your comfort.
        </v-flex>
        <v-flex>
            <v-carousel :height="isOnMobile?200:300" class="ad-carousel">
                <v-carousel-item v-for="(item, i) in headerCarouselItems" :key="i" :src="item"></v-carousel-item>
            </v-carousel>
        </v-flex>
        <v-flex mt-5 px-2>
            <v-layout align-start>
                <span class="headline">Featured Items</span>
            </v-layout>
            <v-progress-linear indeterminate :height="2" v-if="loadingFeaturedProducts"></v-progress-linear>
            <v-divider v-else class="mt-3"></v-divider>
            <v-layout py-3 v-if="featuredProducts.length > 0" style="overflow-x: auto">
                <swiper
                    :options="{
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        }
                    }"
                    class="padded"
                >
                    <swiper-slide
                        v-for="(featuredProduct, i) in featuredProducts"
                        :key="i"
                        class="fit-width"
                    >
                        <Product
                            class="mx-2"
                            v-model="featuredProducts[i]"
                            :portrait="true"
                            :editable="false"
                            :showDescription="false"
                        ></Product>
                    </swiper-slide>

                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </v-layout>
            <v-layout v-else pt-2 pl-2>
                <span class="subheading">No Featured Products Available</span>
            </v-layout>
        </v-flex>
        <v-flex mt-5>
            <v-layout row wrap>
                <v-flex xs12 md4 pa-2>
                    <v-card class="infoCard">
                        <v-icon color="primary">shopping_cart</v-icon>

                        <v-card-title>
                            <span class="title">Order Online</span>
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-card-text style="text-align: left">
                            <span class="body-1">
                                Order from the comfort of your home, and let us do the shopping for you. Come pick up at the store when the order is ready, or even better, let us deliver it at your doorstep.
                                Grocery shopping has never been easier.
                            </span>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat>
                                Shop Now
                                <v-icon right>arrow_forward</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>

                <v-flex xs12 md4 pa-2>
                    <v-card class="infoCard">
                        <v-icon color="primary">local_offer</v-icon>

                        <v-card-title>
                            <span class="title">Get the best deals</span>
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-card-text style="text-align: left">
                            <span
                                class="body-1"
                            >Get all the best deals & promotions right on your screen. Don't miss out on your chance to save more.</span>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat>
                                View Deals
                                <v-icon right>arrow_forward</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>

                <v-flex xs12 md4 pa-2>
                    <v-card class="infoCard">
                        <v-icon color="primary">card_giftcard</v-icon>

                        <v-card-title>
                            <span class="title">Earn Grocery Points</span>
                        </v-card-title>

                        <v-divider></v-divider>

                        <v-card-text style="text-align: left">
                            <span
                                class="body-1"
                            >Introducing Grocery Points! Everytime you purchase groceries online, you are rewarded with Grocery Points, which you can redeem for future purchases.</span>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" flat>
                                View My GP
                                <v-icon right>arrow_forward</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import App, { AppEventType } from '@/App.vue';
    import Logo from '@/components/common/app/Logo.vue';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import Product from '@/components/dashboard/Product.vue';
    import productService, { ProductData } from '@/services/api/productService';
    import AppConfig from '@/AppConfig';

    @Component({
        components: {
            Logo,
            Placeholder,
            Product,
        },
    })
    export default class Home extends Vue {
        private mobileBreakPoint = 800;

        private isOnMobile = false;

        private headerCarouselItems = [
            "/images/headers/header1.jpg",
            "/images/background/clark-young-143622-unsplash.jpg",
            "/images/headers/header2.jpg",
            "/images/background/jordan-madrid-1176338-unsplash.jpg",
            "/images/headers/header3.jpg",
            "/images/background/anne-preble-198119-unsplash.jpg",
            // "/images/background/morgan-von-gunten-1235413-unsplash.jpg",
            // "/images/background/scott-warman-525481-unsplash.jpg",
            // "/images/background/rawpixel-973112-unsplash.jpg",
            // "/images/background/fikri-rasyid-786614-unsplash.jpg",
        ];

        loadingFeaturedProducts = false;

        featuredProducts: ProductData[] = [];

        get appTitle() {
            return AppConfig.title;
        }

        private mounted() {
            this.onWindowResized();
            this.refreshFeaturedProducts();
        }

        private onWindowResized() {
            const wasOnMobile = this.isOnMobile;
            this.isOnMobile = window.innerWidth < this.mobileBreakPoint;
        }

        async refreshFeaturedProducts() {
            this.loadingFeaturedProducts = true;
            let resData = await productService.getAllProducts();
            this.loadingFeaturedProducts = false;

            if (resData.success) {
                this.featuredProducts = resData.products;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ad-carousel {
        /deep/ .v-image__image {
            // background-size: contain !important;
        }
    }

    .v-card.infoCard {
        > i.v-icon {
            font-size: 64px;
            margin-top: 24px;
            margin-bottom: 24px;
        }
    }

    .swiper-container {
        &.padded {
            /deep/ .swiper-wrapper {
                padding-bottom: 50px;
            }
        }
    }
</style>

