<template>
    <v-layout column>
        <v-flex v-for="(cartItem, i) in cartModule.cartData.cartItems" :key="i">
          <span>Product ID: {{cartItem.product}}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>Count: {{cartItem.count}}</span>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Placeholder from '@/views/misc/Placeholder.vue';
    import authModule from '@/store/modules/authModule';
    import cartModule from '@/store/modules/cartModule';

    @Component({
        components: {
            Placeholder,
        }
    })
    export default class Cart extends Vue {
        get authModule() {
            return authModule;
        }

        get cartModule() {
            return cartModule;
        }

        mounted() {

        }
    }
</script>


<style lang="scss" scoped>
</style>

