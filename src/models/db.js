import { userMemStore } from "./mem/user-mem-store.js";
import { monumentMemStore } from "./mem/monument-mem-store.js";
import { placeMemStore } from "./mem/place-mem-store.js";

// import { userJsonStore } from "./json/user-json-store.js";
// import { monumentJsonStore } from "./json/monument-json-store.js";


export const db = {
  userStore: null,
  monumentStore: null,
  placeStore: null,

  init() {
    // this.userStore = userJsonStore;
    // this.monumentStore = monumentJsonStore;
    this.userStore = userMemStore;
    this.monumentStore = monumentMemStore;
    this.placeStore = placeMemStore;
  },
};