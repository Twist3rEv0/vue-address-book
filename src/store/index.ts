import { createStore } from "vuex";
import { Contact } from "@/models/contact.interface";
import { StateContact } from "@/models/state-contact.interface";
import axios from "axios";

export default createStore({
  state: {
    allContacts: [],
  },
  getters: {
    allContacts(state: StateContact): Contact[] {
      return state.allContacts;
    },
  },
  mutations: {
    setContacts(state: StateContact, contacts: Contact[]) {
      state.allContacts = contacts;
    },
    addContact(state: StateContact, newContact: Contact) {
      state.allContacts.push(newContact);
    },
  },
  actions: {
    async loadContacts({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/api/contacts");
        const allContacts: Contact[] = response.data;
        commit("setContacts", allContacts);
      } catch (error) {
        console.error("Error loading contacts:", error);
      }
    },
    async addNewContact({ commit, state }, newContact) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/contacts",
          newContact
        );
        const addedContact = response.data;
        const updatedContacts = [...state.allContacts, addedContact];
        commit("setContacts", updatedContacts);
      } catch (error) {
        console.error("Error adding new contact:", error);
      }
    },
  },
  modules: {},
});
