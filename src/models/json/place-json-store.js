import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { monumentJsonStore } from "./monument-json-store.js";

const db = new Low(new JSONFile("./src/models/json/places.json"));
db.data = { places: [] };

export const placeJsonStore = {
  async getAllPlaces() {
    await db.read();
    return db.data.places;
  },

  async addPlace(place) {
    await db.read();
    place._id = v4();
    db.data.places.push(place);
    await db.write();
    return place;
  },

  async getPlaceById(id) {
    await db.read();
    let list = db.data.places.find((place) => place._id === id);
    if (list) {
    list.monuments = await monumentJsonStore.getMonumentsByPlaceId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserPlaces(userid) {
    await db.read();
    return db.data.places.filter((place) => place.userid === userid);
  },

  async deletePlaceById(id) {
    await db.read();
    const index = db.data.places.findIndex((place) => place._id === id);
    if (index !== -1) db.data.places.splice(index, 1);
    await db.write();
  },

  async deleteAllPlaces() {
    db.data.places = [];
    await db.write();
  },
};