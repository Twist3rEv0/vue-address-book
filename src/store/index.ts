import { createStore } from "vuex";
import addressBookList from "../data/addressBookList.json";

export default createStore({
  state: {
    contactsList: addressBookList || [],
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
