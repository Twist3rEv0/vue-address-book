<template>
  <table class="contacts-list table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Surname</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in allContacts" :key="contact.id">
        <th scope="row">{{ contact.id }}</th>
        <td>{{ contact.name }}</td>
        <td>{{ contact.surname }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "ContactsList",
  computed: {
    ...mapState(["allContacts"]),
  },
  methods: {
    ...mapActions(["loadContacts"]),
  },
  created() {
    this.loadContacts();
  },
});
</script>

<style scoped lang="scss">
@import "ContactsList";
</style>
