<template>
  <table class="contacts-list table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Surname</th>
        <th scope="col">Email</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in allContacts" :key="contact.id">
        <th scope="row">{{ contact.id }}</th>
        <td>{{ contact.name }}</td>
        <td>{{ contact.surname }}</td>
        <td>{{ contact.email || "" }}</td>
        <td>
          <i
            class="bi bi-pencil cursor-pointer pe-2"
            v-on:click="redirectToContactForm(contact.id)"
          ></i>
          <i
            class="bi bi-trash text-danger cursor-pointer pe-2"
            v-on:click="deleteContactFromList(contact.id)"
          ></i>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "ContactsList",
  computed: {
    ...mapState(["allContacts"]),
  },
  methods: {
    ...mapActions(["loadContacts", "deleteContact"]),
    redirectToContactForm(contactIdToEdit: number): void {
      this.$router?.push({
        name: "contact-edit",
        params: { id: contactIdToEdit },
      });
    },
    deleteContactFromList(contactIdToDelete: number): void {
      this.deleteContact(contactIdToDelete);
    },
  },
  setup() {
    onMounted(() => {
      useRouter();
    });
  },
  created() {
    this.loadContacts();
  },
});
</script>

<style scoped lang="scss">
@import "ContactsList";
</style>
