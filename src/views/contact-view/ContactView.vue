<template>
  <div class="contact-view">
    <form
      class="row"
      name="contactForm"
      novalidate
      v-on:submit.prevent="saveContact"
    >
      <div class="col-6 contact-view__form-input">
        <label for="formControlName" class="form-label">Name *</label>
        <input
          type="text"
          class="form-control"
          id="formControlName"
          placeholder="Name"
          name="name"
          v-model="formData.name"
        />
      </div>
      <div class="col-6 contact-view__form-input">
        <label for="formControlSurname" class="form-label">Surname *</label>
        <input
          type="text"
          class="form-control"
          id="formControlSurname"
          placeholder="Surname"
          name="surname"
          v-model="formData.surname"
        />
      </div>
      <div class="col-12 text-center mt-3">
        <p><strong>(*)</strong> Required fields</p>
      </div>
      <div class="col-12 text-center mt-4">
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-default" v-on:click="cancel">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Contact } from "@/models/contact.interface";
import { Ref, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "ContactView",
  computed: {
    ...mapState(["allContacts"]),
  },
  methods: {
    ...mapActions(["loadContacts", "addNewContact"]),
    saveContact() {
      this.addNewContact(this.formData);

      this.$router?.push({ name: "home" });
    },
    cancel() {
      this.formData.name = "";
      this.formData.surname = "";

      this.$router?.push({ name: "home" });
    },
  },
  setup() {
    const formData: Ref<Contact> = ref({
      name: "",
      surname: "",
    });

    onMounted(() => {
      useRouter();
    });

    return { formData };
  },
});
</script>

<style scoped lang="scss">
@import "ContactView";
</style>
