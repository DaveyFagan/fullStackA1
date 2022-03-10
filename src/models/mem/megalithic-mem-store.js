import { v4 } from "uuid";

let megalithicMonuments = [];

export const megalithicMemStore = {
  async getAllMegalithicMonuments() {
    return megalithicMonuments;
  },

  async addMegalithicMonument(megalithicMonument) {
    megalithicMonument._id = v4();
    megalithicMonuments.push(megalithicMonument);
    return megalithicMonument;
  },

  async getMegalithicMonumentById(id) {
    return megalithicMonuments.find((megalithicMonument) => megalithicMonument._id === id);
  },

  async deleteMegalithicMonumentById(id) {
    const index = megalithicMonuments.findIndex((megalithicMonument) => megalithicMonument._id === id);
    megalithicMonuments.splice(index, 1);
  },

  async deleteAllMegalithicMonuments() {
    megalithicMonuments = [];
  },
};