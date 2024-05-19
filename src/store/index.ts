import { createStore } from "vuex";
import { Contact } from "@/models/contact.interface";
import { StateContact } from "@/models/state-contact.interface";
import axios from "axios";

export default createStore({
  state: {
    allContacts: [],
  },
  getters: {
    /**
     * Method for get all contact list
     */
    allContacts(state: StateContact): Contact[] {
      return state.allContacts;
    },
  },
  mutations: {
    /**
     * Method for set contact list
     */
    setContacts(state: StateContact, contacts: Contact[]) {
      state.allContacts = contacts;
    },

    /**
     * Method for add a new contact into contact list
     */
    addContact(state: StateContact, newContact: Contact) {
      state.allContacts.push(newContact);
    },
  },
  actions: {
    /**
     * Get a contact list API
     */
    async loadContacts({ commit }) {
      try {
        // get all contacts and set into contact list
        const response = await axios.get("http://localhost:3000/api/contacts");
        const allContacts: Contact[] = response.data;
        commit("setContacts", allContacts);
      } catch (error) {
        console.error("Error loading contacts:", error);
      }
    },

    /**
     * Add a new contact API
     */
    async addNewContact({ commit, state }, newContact) {
      try {
        let lastIdFromContactList: number | null = null;

        // I get the id of the last contact in the list (the last id that is not null or undefined)
        for (let i = state?.allContacts?.length - 1; i >= 0; i--) {
          const contact = state.allContacts[i];
          if (contact?.id) {
            lastIdFromContactList = contact.id;
            break;
          }
        }

        // if "lastIdFromContactList" is null or undefined, launch the exception for blocking execution and warn the user
        if (!lastIdFromContactList) {
          throw "Last contact id not recovered";
        }

        // from the last contact id in the list, I increase it to be able to insert it into the object containing the new contact to add
        newContact.id = ++lastIdFromContactList;

        // save a new contact
        const response = await axios.post(
          "http://localhost:3000/api/contacts",
          newContact
        );
        const addedContact = response.data;

        // add a new contact into contact list
        commit("addContact", addedContact);
      } catch (error) {
        console.error("Error adding new contact:", error);
      }
    },
  },
  modules: {},
});
