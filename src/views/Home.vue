<template>
  <div class="home">

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Placeholder from '@/views/misc/Placeholder.vue';

@Component({
  components: {
    HelloWorld,
    Placeholder,
  }
})
export default class Home extends Vue {
  mounted() {
  }
}
</script>
