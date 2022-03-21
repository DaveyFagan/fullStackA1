import { Place } from "./place.js";
// eslint-disable-next-line import/no-unresolved
import { monumentMongoStore } from "./monument-mongo-store.js";

export const placeMongoStore = {
  async getAllPlaces() {
    const places = await Place.find().lean();
    return places;
  },

  async getPlaceById(id) {
    if (id) {
      const place = await Place.findOne({ _id: id }).lean();
      if (place) {
        place.monuments = await monumentMongoStore.getMonumentsByPlaceId(place._id);
      }
      return place;
    }
    return null;
  },

  async addPlace(place) {
    const newPlace = new Place(place);
    const placeObj = await newPlace.save();
    return this.getPlaceById(placeObj._id);
  },

  async getUserPlaces(id) {
    const place = await Place.find({ userid: id }).lean();
    return place;
  },

  async deletePlaceById(id) {
    try {
      await Place.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlaces() {
    await Place.deleteMany({});
  }
};