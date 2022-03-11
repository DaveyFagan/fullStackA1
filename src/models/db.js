import { userMemStore } from "./mem/user-mem-store.js";
import { megalithicMemStore } from "./mem/megalithic-mem-store.js";

export const db = {
  userStore: null,
  megalithicStore: null,

  init() {
    this.userStore = userMemStore;
    this.megalithicStore = megalithicMemStore;
  },
};