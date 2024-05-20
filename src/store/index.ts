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
    setContacts(state: StateContact, contacts: Contact[]): void {
      state.allContacts = contacts;
    },

    /**
     * Method for add a new contact into contact list
     */
    addContact(state: StateContact, newContact: Contact): void {
      state.allContacts.push(newContact);
    },

    /**
     * Method for edit a contact into contact list
     */
    editContact(state: StateContact, editedContact: Contact): void {
      // I cycle through the contact list until I find the contact object to modify to replace it with the one passed in the method ("editedContact")
      for (let i = 0; i < state?.allContacts?.length; i++) {
        if (state.allContacts[i]?.id === editedContact?.id) {
          state.allContacts[i] = JSON.parse(JSON.stringify(editedContact));
          break;
        }
      }
    },

    /**
     * Method for delete a contact from contact list
     */
    deleteContact(state: StateContact, contactIdToDeleteFromList: number) {
      // I check if the contact list exists and if so, I print an error to warn the user by not performing any operation
      if (!state?.allContacts) {
        console.error(
          `Error during delete a contact with id ${contactIdToDeleteFromList} from contact list`
        );
        return;
      }

      // delete the contact from the contact list using a "filter" (so that the array is filtered excluding the id passed in the method)
      state.allContacts = state.allContacts.filter(
        (contact: Contact) => contact.id !== contactIdToDeleteFromList
      );
    },
  },
  actions: {
    /**
     * Load a contact list (API)
     */
    async loadContacts({ commit }) {
      try {
        // get all contacts and set into contact list
        const response = await axios.get("http://localhost:3000/api/contact");
        const allContacts: Contact[] = response.data;
        commit("setContacts", allContacts);
      } catch (error) {
        console.error("Error loading contacts:", error);
      }
    },

    /**
     * Add a new contact (API)
     */
    async addNewContact({ commit, state }, newContact: Contact) {
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
          "http://localhost:3000/api/contact",
          newContact
        );
        const addedContact = response.data;

        // add a new contact into contact list
        commit("addContact", addedContact);
      } catch (error) {
        console.error("Error adding new contact:", error);
      }
    },

    /**
     * Edit a contact (API)
     */
    async editContact({ commit }, contactToEdit: Contact) {
      try {
        const contactIdToEdit: number | null = contactToEdit?.id || null;

        // if "contactIdToEdit" is null, launch the exception for blocking execution and warn the user
        if (!contactIdToEdit) {
          throw "Contact id not exists into contact object to edited";
        }

        // save edited contact
        const response = await axios.put(
          `http://localhost:3000/api/contact/${contactIdToEdit}`,
          contactToEdit
        );
        const editedContact = response.data;

        // edit contact into contact list
        commit("editContact", editedContact);
      } catch (error) {
        console.error("Error edit contact:", error);
      }
    },

    /**
     * Delete a contact (API)
     */
    async deleteContact({ commit }, contactIdToDelete: number) {
      try {
        // if "contactIdToDelete" is null, launch the exception for blocking execution and warn the user
        if (!contactIdToDelete) {
          throw "Contact id to delete not specified";
        }

        // delete contact
        await axios.delete(
          `http://localhost:3000/api/contact/${contactIdToDelete}`
        );

        // delete contact from contact list
        commit("deleteContact", contactIdToDelete);
      } catch (error) {
        console.error("Error delete contact:", error);
      }
    },
  },
  modules: {},
});
