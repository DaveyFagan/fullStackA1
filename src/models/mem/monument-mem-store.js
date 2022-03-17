import { v4 } from "uuid";

let monuments = [];

export const monumentMemStore = {
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
    return monuments;
  },

  async addMonument(placeId, monument) {
    monument._id = v4();
    monument.placeid = placeId;
    monuments.push(monument);
    return monument;
  },

  async getMonumentsByplaceId(id) {
    return monuments.filter((monument) => monument.placeid === id);
  },

  async getMonumentById(id) {
    return monuments.find((monument) => monument._id === id);
  },

  async getPlaceMonuments(placeId) {
    return monuments.filter((monument) => monument.placeid === placeId);
  },

  async deleteMonumentById(id) {
    const index = monuments.findIndex((monument) => monument._id === id);
    monuments.splice(index, 1);
  },

  async deleteAllMonuments() {
    monuments = [];
  },

  async updateMonument(monument, updatedmonument) {
    monument.name = updatedmonument.name;
    monument.description = updatedmonument.description;
    monument.lat = updatedmonument.lat;
  },
};