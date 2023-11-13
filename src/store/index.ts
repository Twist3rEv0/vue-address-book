import { createStore } from "vuex";
import { Contact } from "@/models/contact.interface";
import { StateContact } from "@/models/state-contact.interface";
import addressBookList from "../data/addressBookList.json";

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
    loadContacts({ commit }) {
      const allContacts: Contact[] = addressBookList;
      commit("setContacts", allContacts);
    },
    addNewContact({ commit, state }, newContact) {
      const updatedContacts = [...state.allContacts, newContact];
      commit("setContacts", updatedContacts);
    },
  },
  modules: {},
});
