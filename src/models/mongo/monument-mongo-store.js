import { Monument } from "./monument.js";

export const monumentMongoStore = {
  async getAllMonuments() {
        const monuments = await Monument.find().lean();
        return monuments;
      },

  async addMonument(placeId, monument) {
        monument.placeId = placeId;
        const newMonument = new Monument(monument);
        const monumentObj = await newMonument.save();
        return this.getMonumentById(monumentObj._id);
      },

  async getMonumentsByPlaceId(id) {
    const monuments = await Monument.find({ placeid: id }).lean();
    return monuments;
  },

  async getMonumentById(id) {
    if (id) {
      const monument = await Monument.findOne({ _id: id }).lean();
      console.log(`Monument is: ${  monument}`);
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

  async updateMonument(monument, updatedMonument) {
    monument.name = updatedMonument.name;
    monument.description = updatedMonument.description;
    monument.lng = updatedMonument.lng;
    monument.lng = updatedMonument.lng;
    await Monument.save();
  },
};