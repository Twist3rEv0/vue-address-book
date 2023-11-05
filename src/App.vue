<template>
  <div class="container">
    <NavBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/nav-bar/NavBar.vue";

export default defineComponent({
  components: { NavBar },
});
</script>
