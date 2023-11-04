<template>
  <div class="home">
    <ContactsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactsList from "@/components/contacts-list/ContactsList.vue";

export default defineComponent({
  name: "HomeView",
  components: { ContactsList },
});
</script>
