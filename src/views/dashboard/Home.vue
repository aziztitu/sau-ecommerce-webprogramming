<template>
    <v-layout column v-resize="onWindowResized">
        <v-flex>
            <v-carousel :height="isOnMobile?200:300">
                <v-carousel-item v-for="(item, i) in headerCarouselItems" :key="i" :src="item"></v-carousel-item>
            </v-carousel>
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
                            <span class="body-2">
                                Order from the comfort of your home, and let us do the shopping for you. Come pick up at the store when the order is ready, or even better, let us deliver it at your doorstep.
                                Grocery shopping has never been easier.
                            </span>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary">Shop Now
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
                                class="body-2"
                            >Get all the best deals & promotions right on your screen. Don't miss out on your chance to save more.</span>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary">View Deals
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
                                class="body-2"
                            >Introducing Grocery Points! Everytime you purchase groceries online, you are rewarded with Grocery Points, which you can redeem for future purchases.</span>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary">View My GP
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

    @Component({
        components: {
            Logo,
            Placeholder,
        },
    })
    export default class Home extends Vue {
        private mobileBreakPoint = 800;

        private isOnMobile = false;

        private headerCarouselItems = [
            "/images/headers/header1.jpg",
            "/images/headers/header2.jpg",
            "/images/headers/header3.jpg",
            "/images/background/clark-young-143622-unsplash.jpg",
            "/images/background/jordan-madrid-1176338-unsplash.jpg",
            // "/images/background/morgan-von-gunten-1235413-unsplash.jpg",
            "/images/background/scott-warman-525481-unsplash.jpg",
            "/images/background/rawpixel-973112-unsplash.jpg",
            "/images/background/fikri-rasyid-786614-unsplash.jpg",
            "/images/background/anne-preble-198119-unsplash.jpg",
        ];

        private mounted() {
            this.onWindowResized();
        }

        private onWindowResized() {
            const wasOnMobile = this.isOnMobile;
            this.isOnMobile = window.innerWidth < this.mobileBreakPoint;
        }
    }
</script>

<style lang="scss" scoped>
    .v-card.infoCard {
        > i.v-icon {
            font-size: 64px;
            margin-top: 24px;
            margin-bottom: 24px;
        }
    }
</style>

