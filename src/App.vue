<template>
  <div id="app">
    <NavBar v-if="showNavBar" />
    <router-view />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  components: { NavBar },
  setup() {
    const route = useRoute();

    const showNavBar = computed(() => route.path !== "/login");

    return { showNavBar };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
