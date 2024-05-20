<template>
  <div class="contact-view">
    <form class="row" name="contactForm" v-on:submit.prevent="saveContact">
      <div class="col-12 col-md-6 contact-view__form-input">
        <label for="formControlName" class="form-label">Name *</label>
        <input
          type="text"
          class="form-control"
          id="formControlName"
          placeholder="Name"
          name="name"
          v-model="formData.name"
          required
        />
      </div>
      <div class="col-12 col-md-6 contact-view__form-input">
        <label for="formControlSurname" class="form-label">Surname *</label>
        <input
          type="text"
          class="form-control"
          id="formControlSurname"
          placeholder="Surname"
          name="surname"
          v-model="formData.surname"
          required
        />
      </div>
      <div class="col-12 col-md-6 contact-view__form-input">
        <label for="formControlAddress" class="form-label">Address *</label>
        <input
          type="text"
          class="form-control"
          id="formControlAddress"
          placeholder="Address"
          name="address"
          v-model="formData.address"
          required
        />
      </div>
      <div class="col-12 col-md-2 contact-view__form-input">
        <label for="formControlCity" class="form-label">City *</label>
        <input
          type="text"
          class="form-control"
          id="formControlCity"
          placeholder="City"
          name="city"
          v-model="formData.city"
          required
        />
      </div>
      <div class="col-12 col-md-2 contact-view__form-input">
        <label for="formControlProvince" class="form-label">Province *</label>
        <input
          type="text"
          class="form-control"
          id="formControlProvince"
          placeholder="Province"
          name="province"
          v-model="formData.province"
          required
        />
      </div>
      <div class="col-12 col-md-2 contact-view__form-input">
        <label for="formControlZipCode" class="form-label">Zip code *</label>
        <input
          type="text"
          class="form-control"
          id="formControlZipCode"
          placeholder="ZipCode"
          name="zipCode"
          v-model="formData.zipCode"
          required
        />
      </div>
      <div class="col-12 col-md-3 contact-view__form-input">
        <label for="formControlEmail" class="form-label">Email *</label>
        <input
          type="email"
          class="form-control"
          id="formControlEmail"
          placeholder="Email"
          name="email"
          v-model="formData.email"
          required
        />
      </div>
      <div class="col-12 col-md-3 contact-view__form-input">
        <label for="formControlTelephone" class="form-label">Telephone</label>
        <input
          type="text"
          class="form-control"
          id="formControlTelephone"
          placeholder="Telephone"
          name="tel"
          v-model="formData.tel"
        />
      </div>
      <div class="col-12 col-md-3 contact-view__form-input">
        <label for="formControlFax" class="form-label">Fax</label>
        <input
          type="text"
          class="form-control"
          id="formControlFax"
          placeholder="Fax"
          name="fax"
          v-model="formData.fax"
        />
      </div>
      <div class="col-12 col-md-3 contact-view__form-input">
        <label for="formControlCellular" class="form-label">Cellular</label>
        <input
          type="text"
          class="form-control"
          id="formControlCellular"
          placeholder="Cellular"
          name="cellular"
          v-model="formData.cell"
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
import store from "@/store";
import { Ref, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "ContactView",
  computed: {
    ...mapState(["allContacts"]),
  },
  methods: {
    ...mapActions(["addNewContact", "editContact"]),
    saveContact(): void {
      // if "contactId" is setted and not null
      if (this.contactId) {
        // save the new changes to the contact with specific id
        this.editContact(this.formData);
      } else {
        // ... otherwise, save a new contact
        this.addNewContact(this.formData);
      }

      // reset contact form
      this.resetForm();

      // redirect to home
      this.$router?.push({ name: "home" });
    },
    cancel(): void {
      // reset contact form
      this.resetForm();

      // redirect to home
      this.$router?.push({ name: "home" });
    },
    resetForm(): void {
      // reset all fields into contact form
      for (const key of Object.keys(this.formData)) {
        (this.formData as any)[key] =
          typeof (this.formData as any)[key] === "string" ? "" : null;
      }
    },
  },
  setup() {
    const route = useRoute();

    const formData: Ref<Contact> = ref({
      name: "",
      surname: "",
      address: "",
      city: "",
      province: "",
      country: "",
      zipCode: "",
      email: "",
      tel: "",
      fax: "",
      cell: "",
    });
    let contactId: Ref<number | null> = ref(null);

    onMounted(() => {
      useRouter();

      // get a contact id from route param
      contactId.value = route.params?.id ? Number(route.params?.id) : null;

      // if "contactId" is not null, is searched into "allContacts" the matching contact and the data is updated into formData
      if (contactId.value) {
        const contact = store.state.allContacts.find(
          (contact: Contact) => contact.id === contactId.value
        );
        if (contact) {
          formData.value = { ...contact };
        }
      }
    });

    watch(contactId, (newId) => {
      // if "contactId" is not null, is searched into "allContacts" the matching contact and the data is updated into formData
      if (newId) {
        const contact = store.state.allContacts.find(
          (contact: Contact) => contact.id === newId
        );
        if (contact) {
          formData.value = { ...contact };
        }
      }
    });

    return { formData, contactId };
  },
});
</script>

<style scoped lang="scss">
@import "ContactView";
</style>
