import { userMemStore } from "./mem/user-mem-store.js";
import { megalithicMemStore } from "./mem/megalithic-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";

// import { userJsonStore } from "./json/user-json-store.js";
// import { megalithicJsonStore } from "./json/megalithic-json-store.js";


export const db = {
  userStore: null,
  megalithicStore: null,
  placeStore: null,

  init() {
    // this.userStore = userJsonStore;
    // this.megalithicStore = megalithicJsonStore;
    this.userStore = userMemStore;
    this.megalithicStore = megalithicMemStore;
    this.placeStore = placeMemStore;
  },
};