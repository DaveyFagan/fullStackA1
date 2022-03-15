import { v4 } from "uuid";

let megalithicMonuments = [];

export const megalithicMemStore = {
/*
  async getUserMegMonuments(userid) {
    return megalithicMonuments.filter((megalithicMonument) => megalithicMonument.userid === userid);
  },
// done
  async getAllMegalithicMonuments() {
    return megalithicMonuments;
  },
// done
  async addMegalithicMonument(placeId, megalithicMonument) {
    megalithicMonument._id = v4();
    megalithicMonument.placeid = placeId;
    megalithicMonuments.push(megalithicMonument)
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
  */

  async getAllMonuments() {
    return megalithicMonuments;
  },

  async addMonument(placeId, megalithicMonument) {
    megalithicMonument._id = v4();
    megalithicMonument.placeid = placeId;
    megalithicMonuments.push(megalithicMonument);
    return megalithicMonument;
  },

  async getMonumentsByplaceId(id) {
    return megalithicMonuments.filter((megalithicMonument) => megalithicMonument.placeid === id);
  },

  async getMonumentById(id) {
    return megalithicMonuments.find((megalithicMonument) => megalithicMonument._id === id);
  },

  async getPlaceMonuments(placeId) {
    return megalithicMonuments.filter((megalithicMonument) => megalithicMonument.placeid === placeId);
  },

  async deleteMonument(id) {
    const index = megalithicMonuments.findIndex((megalithicMonument) => megalithicMonument._id === id);
    monuments.splice(index, 1);
  },

  async deleteAllMonuments() {
    megalithicMonuments = [];
  },

  async updateMonument(megalithicMonument, updatedmonument) {
    megalithicMonument.name = updatedmonument.name;
    megalithicMonument.description = updatedmonument.description;
    megalithicMonument.lat = updatedmonument.lat;
  },
};