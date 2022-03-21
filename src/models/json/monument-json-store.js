import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/monuments.json"));
db.data = { monuments: [] };

export const monumentJsonStore = {
  async getAllMonuments() {
    await db.read();
    return db.data.monuments;
  },

  async addMonument(placeId, monument) {
    await db.read();
    monument._id = v4();
    monument.placeid = placeId;
    db.data.monuments.push(monument);
    await db.write();
    return monument;
  },

  async getMonumentsByPlaceId(id) {
    await db.read();
    return db.data.monuments.filter((monument) => monument.placeid === id);
  },

  async getMonumentById(id) {
    await db.read();
    let u = db.data.monuments.find((monument) => monument._id === id);
    if (u === undefined) u = null;
    return u;
  },

  async deleteMonumentById(id) {
    await db.read();
    const index = db.data.monuments.findIndex((monument) => monument._id === id);
    if (index !== -1) monuments.splice(index, 1);
    await db.write();
  },

  async deleteAllMonuments() {
    db.data.monuments = [];
    await db.write();
  },

  async updateMonument(monument, updatedMonument) {
    monument.title = updatedMonument.title;
    monument.artist = updatedMonument.artist;
    monument.duration = updatedMonument.duration;
    await db.write();
  },
};