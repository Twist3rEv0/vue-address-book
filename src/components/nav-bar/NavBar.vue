<template>
  <div class="nav-bar">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/add">Add contact</router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
});
</script>

<style scoped lang="scss">
@import "NavBar";
</style>
