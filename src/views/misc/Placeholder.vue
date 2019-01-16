<template>
    <div class="placeholder d-flex">
        <v-card
            class="flat transparent logo-container d-flex justify-center align-center"
            ref="logoContainer"
        >
            <Logo class="large"></Logo>
        </v-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import App, { AppEventType } from "@/App.vue";
import Logo from "@/components/common/app/Logo.vue";

@Component({
    components: {
        Logo
    }
})
export default class Placeholder extends Vue {}
</script>

<style lang="scss" scoped>
.placeholder {
    min-height: 100%;

    .logo {
        fill: #e3e3e3;

        &.theme--dark {
            fill: #383838;
        }
    }
}
</style>

