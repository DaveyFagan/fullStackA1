import { Monument } from "./monument.js";
import { Place } from "./place.js";
import { User } from "./user.js";

export const monumentMongoStore = {
  async getAllMonuments() {
    const monuments = await Monument.find().lean();
    return monuments;
  },

  async addMonument(placeid, monument) {
    monument.placeid = placeid;
    const newMonument = new Monument(monument);
    const monumentobj = await newMonument.save();
    return this.getMonumentById(monumentobj._id);
  },

  async getMonumentsByPlaceId(id) {
    const monuments = await Monument.find({ placeid: id }).lean();
    return monuments;
  },

  async getMonumentById(id) {
    if (id) {
      const monument = await Monument.findOne({ _id: id }).lean();
      return monument;
    }
    return null;
  },

  async deleteMonumentById(id) {
    try {
      await Monument.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllMonuments() {
    await Monument.deleteMany({});
  },

  async updateMonument(updatedMonument) {
    const monument = await Monument.findOne({ _id: updatedMonument._id });
    monument.name = updatedMonument.name;
    monument.description = updatedMonument.description;
    monument.lat = updatedMonument.lat;
    await Monument.save();
  },
};


