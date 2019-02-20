<template>
    <v-flex class="max-height">
        <v-layout column>
            <v-flex>
                <v-card>
                    <!-- <v-card-title></v-card-title> -->
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md4 class="price-range">
                                <v-layout row>
                                    <span class="subheading">Price Range</span>
                                </v-layout>
                                <v-layout row px-2>
                                    <v-range-slider
                                        v-model="searchResultOptions.priceRange"
                                        :min="minPrice"
                                        :max="maxPrice"
                                        class="mt-2"
                                    ></v-range-slider>
                                </v-layout>
                                <v-layout row justify-space-between px-1>
                                    <v-text-field label="" prefix="$" v-model="searchResultOptions.priceRange[0]"></v-text-field>
                                    <v-text-field label="" prefix="$" v-model="searchResultOptions.priceRange[1]"></v-text-field>
                                    <!-- <span>${{searchResultOptions.priceRange[1]}}</span> -->
                                </v-layout>
                            </v-flex>


                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-flex>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';

    @Component({
        components: {
            Placeholder,
        }
    })
    export default class Shop extends Vue {
        minPrice = 0;
        maxPrice = 1000;

        searchResultOptions = {
            priceRange: [this.minPrice, this.maxPrice]
        }

        mounted() {

        }
    }
</script>


<style lang="scss" scoped>
.price-range {
  .v-input--range-slider {
    max-height: 26px;
  }

  .v-text-field {
    max-width: 50px;
    margin-top: 0;
    padding-top: 0;
    max-height: 36px;
  }
}
</style>

